// DexKit - An high-performance runtime parsing library for dex
// implemented in C++.
// Copyright (C) 2022-2023 LuckyPray
// https://github.com/LuckyPray/DexKit
//
// This program is free software: you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation, either
// version 3 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see
// <https://www.gnu.org/licenses/>.
// <https://github.com/LuckyPray/DexKit/blob/master/LICENSE>.

#include "dex_item.h"

namespace dexkit {

std::vector<std::future<std::vector<ClassBean>>>
DexItem::FindClass(
        const schema::FindClass *query,
        const std::set<uint32_t> &in_class_set,
        trie::PackageTrie &packageTrie,
        ThreadPool &pool,
        uint32_t slice_size,
        bool &find_fist_flag
) {
    std::vector<std::future<std::vector<ClassBean>>> futures;
    uint32_t split_count;
    if (slice_size > 0) {
        split_count = (this->reader.ClassDefs().size() + slice_size - 1) / slice_size;
    } else {
        split_count = 1;
        slice_size = this->reader.ClassDefs().size();
    }
    futures.reserve(split_count);
    for (auto i = 0; i < split_count; ++i) {
        futures.emplace_back(pool.enqueue(
                [this, query, &in_class_set, &packageTrie, i, slice_size, &find_fist_flag] {
                    return FindClass(query, in_class_set, packageTrie, i * slice_size, std::min((i + 1) * slice_size, (uint32_t) this->reader.ClassDefs().size()), find_fist_flag);
                }
        ));
    }
    return futures;
}

std::vector<std::future<std::vector<MethodBean>>>
DexItem::FindMethod(
        const schema::FindMethod *query,
        const std::set<uint32_t> &in_class_set,
        const std::set<uint32_t> &in_method_set,
        trie::PackageTrie &packageTrie,
        ThreadPool &pool,
        uint32_t slice_size,
        bool &find_fist_flag
) {
    std::vector<std::future<std::vector<MethodBean>>> futures;
    uint32_t split_count;
    if (slice_size > 0) {
        split_count = (this->reader.MethodIds().size() + slice_size - 1) / slice_size;
    } else {
        split_count = 1;
        slice_size = this->reader.MethodIds().size();
    }
    futures.reserve(split_count);
    for (auto i = 0; i < split_count; ++i) {
        futures.emplace_back(pool.enqueue(
                [this, query, &in_class_set, &in_method_set, &packageTrie, i, slice_size, &find_fist_flag] {
                    return FindMethod(query, in_class_set, in_method_set, packageTrie, i * slice_size, std::min((i + 1) * slice_size, (uint32_t) this->reader.MethodIds().size()), find_fist_flag);
                }
        ));
    }
    return futures;
}

std::vector<std::future<std::vector<FieldBean>>>
DexItem::FindField(
        const schema::FindField *query,
        const std::set<uint32_t> &in_class_set,
        const std::set<uint32_t> &in_field_set,
        trie::PackageTrie &packageTrie,
        ThreadPool &pool,
        uint32_t slice_size,
        bool &find_fist_flag
) {
    std::vector<std::future<std::vector<FieldBean>>> futures;
    uint32_t split_count;
    if (slice_size > 0) {
        split_count = (this->reader.FieldIds().size() + slice_size - 1) / slice_size;
    } else {
        split_count = 1;
        slice_size = this->reader.FieldIds().size();
    }
    futures.reserve(split_count);
    for (auto i = 0; i < split_count; ++i) {
        futures.emplace_back(pool.enqueue(
                [this, query, &in_class_set, &in_field_set, &packageTrie, i, slice_size, &find_fist_flag] {
                    return FindField(query, in_class_set, in_field_set, packageTrie, i * slice_size, std::min((i + 1) * slice_size, (uint32_t) this->reader.FieldIds().size()), find_fist_flag);
                }
        ));
    }
    return futures;
}

std::vector<ClassBean>
DexItem::FindClass(
        const schema::FindClass *query,
        const std::set<uint32_t> &in_class_set,
        trie::PackageTrie &packageTrie,
        uint32_t start,
        uint32_t end,
        bool &find_fist_flag
) {

    std::vector<uint32_t> find_result;
    for (auto i = start; i < end; ++i) {
        if (query->find_first() && find_fist_flag) break;
        auto &class_def = this->reader.ClassDefs()[i];
        if (query->in_classes() && !in_class_set.contains(class_def.class_idx)) continue;
        if (query->search_packages() || query->exclude_packages()) {
            auto hit = packageTrie.search(this->type_names[class_def.class_idx], query->ignore_packages_case());
            if (query->exclude_packages() && (hit & 1)) continue;
            if (query->search_packages() && !(hit >> 1)) continue;
        }

        if (IsClassMatched(class_def.class_idx, query->matcher())) {
            find_result.emplace_back(class_def.class_idx);
            if (query->find_first()) {
                find_fist_flag = true;
                break;
            }
        }
    }

    std::vector<ClassBean> result;
    result.reserve(find_result.size());
    for (auto idx: find_result) {
        result.emplace_back(GetClassBean(idx));
    }
    return result;
}

std::vector<MethodBean>
DexItem::FindMethod(
        const schema::FindMethod *query,
        const std::set<uint32_t> &in_class_set,
        const std::set<uint32_t> &in_method_set,
        trie::PackageTrie &packageTrie,
        uint32_t start,
        uint32_t end,
        bool &find_fist_flag
) {

    std::vector<uint32_t> find_result;
    for (auto method_idx = start; method_idx < end; ++method_idx) {
        if (query->find_first() && find_fist_flag) break;
        auto &method_def = this->reader.MethodIds()[method_idx];
        if (!this->type_def_flag[method_def.class_idx]) continue;
        if (query->in_classes() && !in_class_set.contains(method_def.class_idx)) continue;
        if (query->search_packages() || query->exclude_packages()) {
            auto hit = packageTrie.search(this->type_names[method_def.class_idx], query->ignore_packages_case());
            if (query->exclude_packages() && (hit & 1)) continue;
            if (query->search_packages() && !(hit >> 1)) continue;
        }
        if (query->in_methods() && !in_method_set.contains(method_idx)) continue;

        if (IsMethodMatched(method_idx, query->matcher())) {
            find_result.emplace_back(method_idx);
            if (query->find_first()) {
                find_fist_flag = true;
                break;
            }
        }
    }

    std::vector<MethodBean> result;
    result.reserve(find_result.size());
    for (auto idx: find_result) {
        result.emplace_back(GetMethodBean(idx));
    }
    return result;
}

std::vector<FieldBean>
DexItem::FindField(
        const schema::FindField *query,
        const std::set<uint32_t> &in_class_set,
        const std::set<uint32_t> &in_field_set,
        trie::PackageTrie &packageTrie,
        uint32_t start,
        uint32_t end,
        bool &find_fist_flag
) {

    std::vector<uint32_t> find_result;
    for (auto field_idx = start; field_idx < end; ++field_idx) {
        if (query->find_first() && find_fist_flag) break;
        auto &field_def = this->reader.FieldIds()[field_idx];
        if (!this->type_def_flag[field_def.class_idx]) continue;
        if (query->in_classes() && !in_class_set.contains(field_def.class_idx)) continue;
        if (query->search_packages() || query->exclude_packages()) {
            auto hit = packageTrie.search(this->type_names[field_def.class_idx], query->ignore_packages_case());
            if (query->exclude_packages() && (hit & 1)) continue;
            if (query->search_packages() && !(hit >> 1)) continue;
        }
        if (query->in_fields() && !in_field_set.contains(field_idx)) continue;

        if (IsFieldMatched(field_idx, query->matcher())) {
            find_result.emplace_back(field_idx);
            if (query->find_first()) {
                find_fist_flag = true;
                break;
            }
        }
    }

    std::vector<FieldBean> result;
    result.reserve(find_result.size());
    for (auto idx: find_result) {
        result.emplace_back(GetFieldBean(idx));
    }
    return result;
}

std::vector<ClassBean>
DexItem::FindClass(
        const schema::FindClass *query,
        trie::PackageTrie &packageTrie,
        uint32_t class_idx
) {

    std::vector<uint32_t> find_result;
    auto &class_def = this->reader.ClassDefs()[class_idx];
    if (query->search_packages() || query->exclude_packages()) {
        auto hit = packageTrie.search(this->type_names[class_def.class_idx], query->ignore_packages_case());
        if (query->exclude_packages() && (hit & 1)) return {};
        if (query->search_packages() && !(hit >> 1)) return {};
    }

    if (IsClassMatched(class_def.class_idx, query->matcher())) {
        find_result.emplace_back(class_def.class_idx);
    }

    std::vector<ClassBean> result;
    result.reserve(find_result.size());
    for (auto idx: find_result) {
        result.emplace_back(GetClassBean(idx));
    }
    return result;
}

std::vector<MethodBean>
DexItem::FindMethod(
        const schema::FindMethod *query,
        trie::PackageTrie &packageTrie,
        uint32_t class_idx
) {

    std::vector<uint32_t> find_result;
    for (auto method_idx: this->class_method_ids[class_idx]) {
        auto &method_def = this->reader.MethodIds()[method_idx];
        if (query->search_packages() || query->exclude_packages()) {
            auto hit = packageTrie.search(this->type_names[method_def.class_idx], query->ignore_packages_case());
            if (query->exclude_packages() && (hit & 1)) continue;
            if (query->search_packages() && !(hit >> 1)) continue;
        }

        if (IsMethodMatched(method_idx, query->matcher())) {
            find_result.emplace_back(method_idx);
            if (query->find_first()) {
                break;
            }
        }
    }

    std::vector<MethodBean> result;
    result.reserve(find_result.size());
    for (auto idx: find_result) {
        result.emplace_back(GetMethodBean(idx));
    }
    return result;
}

std::vector<FieldBean>
DexItem::FindField(
        const schema::FindField *query,
        trie::PackageTrie &packageTrie,
        uint32_t class_idx
) {

    std::vector<uint32_t> find_result;
    for (auto field_idx: this->class_field_ids[class_idx]) {
        auto &field_def = this->reader.FieldIds()[field_idx];
        if (query->search_packages() || query->exclude_packages()) {
            auto hit = packageTrie.search(this->type_names[field_def.class_idx], query->ignore_packages_case());
            if (query->exclude_packages() && (hit & 1)) continue;
            if (query->search_packages() && !(hit >> 1)) continue;
        }

        if (IsFieldMatched(field_idx, query->matcher())) {
            find_result.emplace_back(field_idx);
            if (query->find_first()) {
                break;
            }
        }
    }

    std::vector<FieldBean> result;
    result.reserve(find_result.size());
    for (auto idx: find_result) {
        result.emplace_back(GetFieldBean(idx));
    }
    return result;
}

}