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
@file:Suppress("MemberVisibilityCanBePrivate", "unused")

package org.luckypray.dexkit.result

import org.luckypray.dexkit.DexKitBridge
import org.luckypray.dexkit.InnerAnnotationEncodeArray
import org.luckypray.dexkit.InnerAnnotationEncodeValueMeta
import org.luckypray.dexkit.InnerAnnotationMeta
import org.luckypray.dexkit.InnerClassMeta
import org.luckypray.dexkit.InnerEncodeValueBoolean
import org.luckypray.dexkit.InnerEncodeValueByte
import org.luckypray.dexkit.InnerEncodeValueChar
import org.luckypray.dexkit.InnerEncodeValueDouble
import org.luckypray.dexkit.InnerEncodeValueFloat
import org.luckypray.dexkit.InnerEncodeValueInt
import org.luckypray.dexkit.InnerEncodeValueLong
import org.luckypray.dexkit.InnerEncodeValueNull
import org.luckypray.dexkit.InnerEncodeValueShort
import org.luckypray.dexkit.InnerEncodeValueString
import org.luckypray.dexkit.InnerFieldMeta
import org.luckypray.dexkit.InnerMethodMeta
import org.luckypray.dexkit.query.enums.AnnotationEncodeValueType

class AnnotationEncodeValue private constructor(
    val value: Any,
    val type: AnnotationEncodeValueType
) {

    internal companion object `-Companion` {
        fun from(bridge: DexKitBridge, encodeValueMeta: InnerAnnotationEncodeValueMeta): AnnotationEncodeValue {
            val type = AnnotationEncodeValueType.from(encodeValueMeta.valueType)
            val value: Any = when (type) {
                AnnotationEncodeValueType.ByteValue -> (encodeValueMeta.value(InnerEncodeValueByte()) as InnerEncodeValueByte).value
                AnnotationEncodeValueType.ShortValue -> (encodeValueMeta.value(InnerEncodeValueShort()) as InnerEncodeValueShort).value
                AnnotationEncodeValueType.CharValue -> (encodeValueMeta.value(InnerEncodeValueChar()) as InnerEncodeValueChar).value
                AnnotationEncodeValueType.IntValue -> (encodeValueMeta.value(InnerEncodeValueInt()) as InnerEncodeValueInt).value
                AnnotationEncodeValueType.LongValue -> (encodeValueMeta.value(InnerEncodeValueLong()) as InnerEncodeValueLong).value
                AnnotationEncodeValueType.FloatValue -> (encodeValueMeta.value(InnerEncodeValueFloat()) as InnerEncodeValueFloat).value
                AnnotationEncodeValueType.DoubleValue -> (encodeValueMeta.value(InnerEncodeValueDouble()) as InnerEncodeValueDouble).value
                AnnotationEncodeValueType.StringValue -> (encodeValueMeta.value(InnerEncodeValueString()) as InnerEncodeValueString).value!!
                AnnotationEncodeValueType.TypeValue -> ClassData.from(bridge, encodeValueMeta.value(InnerClassMeta()) as InnerClassMeta)
                AnnotationEncodeValueType.MethodValue -> MethodData.from(bridge, encodeValueMeta.value(InnerMethodMeta()) as InnerMethodMeta)
                AnnotationEncodeValueType.EnumValue -> FieldData.from(bridge, encodeValueMeta.value(InnerFieldMeta()) as InnerFieldMeta)
                AnnotationEncodeValueType.ArrayValue -> AnnotationEncodeArrayData.from(bridge, encodeValueMeta.value(InnerAnnotationEncodeArray()) as InnerAnnotationEncodeArray)
                AnnotationEncodeValueType.AnnotationValue -> AnnotationData.from(bridge, encodeValueMeta.value(InnerAnnotationMeta()) as InnerAnnotationMeta)
                AnnotationEncodeValueType.NullValue -> encodeValueMeta.value(InnerEncodeValueNull()) as InnerEncodeValueNull
                AnnotationEncodeValueType.BoolValue -> (encodeValueMeta.value(InnerEncodeValueBoolean()) as InnerEncodeValueBoolean).value
            }
            return AnnotationEncodeValue(value, type)
        }

        fun from(value: Any, type: AnnotationEncodeValueType): AnnotationEncodeValue {
            return AnnotationEncodeValue(value, type)
        }
    }

    override fun toString(): String {
        return buildString {
            when (type) {
                AnnotationEncodeValueType.TypeValue -> {
                    append((value as ClassData).name)
                }
                AnnotationEncodeValueType.MethodValue -> {
                    val methodData = value as MethodData
                    append(methodData.returnTypeName)
                    append(" ")
                    append(methodData.className)
                    append(".")
                    append(methodData.methodName)
                    append("(")
                    append(methodData.paramTypeNames.joinToString(", "))
                    append(")")
                }
                AnnotationEncodeValueType.EnumValue -> {
                    val fieldData = value as FieldData
                    append(fieldData.typeName)
                    append(".")
                    append(fieldData.fieldName)
                }
                AnnotationEncodeValueType.ArrayValue -> {
                    append("{")
                    append((value as AnnotationEncodeArrayData).values.joinToString(", "))
                    append("}")
                }
                AnnotationEncodeValueType.AnnotationValue -> {
                    append((value as AnnotationData).toString())
                }
                AnnotationEncodeValueType.StringValue -> {
                    append("\"")
                    append(value)
                    append("\"")
                }
                AnnotationEncodeValueType.NullValue -> {
                    append("null")
                }
                else -> {
                    append(value)
                }
            }
        }
    }
}