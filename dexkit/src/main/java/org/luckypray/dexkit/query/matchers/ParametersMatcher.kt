/*
 * DexKit - An high-performance runtime parsing library for dex
 * implemented in C++
 * Copyright (C) 2022-2023 LuckyPray
 * https://github.com/LuckyPray/DexKit
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public 
 * License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/>.
 * <https://github.com/LuckyPray/DexKit/blob/master/LICENSE>.
 */
@file:Suppress("MemberVisibilityCanBePrivate", "unused", "INVISIBLE_REFERENCE", "INVISIBLE_MEMBER")

package org.luckypray.dexkit.query.matchers

import com.google.flatbuffers.FlatBufferBuilder
import org.luckypray.dexkit.InnerParametersMatcher
import org.luckypray.dexkit.query.base.BaseQuery
import org.luckypray.dexkit.query.matchers.base.IntRange

class ParametersMatcher : BaseQuery() {
    var parametersMatcher: MutableList<ParameterMatcher?>? = null
        private set
    var rangeMatcher: IntRange? = null
        private set

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     */
    var count: Int
        @JvmSynthetic
        @Deprecated("Property can only be written.", level = DeprecationLevel.ERROR)
        get() = throw NotImplementedError()
        @JvmSynthetic
        set(value) {
            count(value)
        }

    /**
     * Need to match parameters. List length implies parameter count.
     * ----------------
     * 要匹配的参数列表。列表长度暗含了参数数量。
     *
     * @param parameters parameters / 参数列表
     * @return [ParametersMatcher]
     */
    fun params(parameters: Collection<ParameterMatcher?>) = also {
        this.parametersMatcher = parameters.toMutableList()
    }

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     *
     * @param count parameter count / 参数数量
     * @return [ParametersMatcher]
     */
    fun count(count: Int) = also {
        this.rangeMatcher = IntRange(count)
    }

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     *
     * @param range parameter count range / 参数数量范围
     * @return [ParametersMatcher]
     */
    fun count(range: IntRange) = also {
        this.rangeMatcher = range
    }

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     *
     * @param range parameter count range / 参数数量范围
     * @return [ParametersMatcher]
     */
    fun count(range: kotlin.ranges.IntRange) = also {
        rangeMatcher = IntRange(range)
    }

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     *
     * @param min min / 最小值
     * @param max max / 最大值
     * @return [ParametersMatcher]
     */
    fun count(min: Int = 0, max: Int = Int.MAX_VALUE) = also {
        this.rangeMatcher = IntRange(min, max)
    }

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     *
     * @param min min / 最小值
     * @return [ParametersMatcher]
     */
    fun countMin(min: Int) = also {
        this.rangeMatcher = IntRange(min, Int.MAX_VALUE)
    }

    /**
     * Parameter count to match.
     * ----------------
     * 要匹配的参数数量。
     *
     * @param max max / 最大值
     * @return [ParametersMatcher]
     */
    fun countMax(max: Int) = also {
        this.rangeMatcher = IntRange(0, max)
    }

    /**
     * Add a parameter matcher.
     * ----------------
     * 添加一个参数匹配器。
     *
     * @param matcher parameter matcher / 参数匹配器
     * @return [ParametersMatcher]
     */
    fun add(matcher: ParameterMatcher?) = also {
        parametersMatcher = parametersMatcher ?: mutableListOf()
        parametersMatcher!!.add(matcher)
    }

    // region DSL

    /**
     * @see add
     */
    @kotlin.internal.InlineOnly
    inline fun add(init: ParameterMatcher.() -> Unit) = also {
        add(ParameterMatcher().apply(init))
    }

    // endregion

    companion object {
        @JvmStatic
        fun create() = ParametersMatcher()
    }
    
    override fun innerBuild(fbb: FlatBufferBuilder): Int {
        val root = InnerParametersMatcher.createParametersMatcher(
            fbb,
            parametersMatcher?.map { it?.build(fbb) ?: ParameterMatcher().build(fbb) }?.toIntArray()
                ?.let { fbb.createVectorOfTables(it) } ?: 0,
            rangeMatcher?.build(fbb) ?: 0
        )
        fbb.finish(root)
        return root
    }
}