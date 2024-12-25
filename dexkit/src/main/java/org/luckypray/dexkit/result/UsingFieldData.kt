package org.luckypray.dexkit.result

import org.luckypray.dexkit.DexKitBridge
import org.luckypray.dexkit.InnerUsingFieldMeta
import org.luckypray.dexkit.InnerUsingType

data class UsingFieldData(
    val field: FieldData,
    val usingType: FieldUsingType,
) {
    internal companion object `-Companion` {
        fun from(bridge: DexKitBridge, usingFieldMeta: InnerUsingFieldMeta): UsingFieldData {
            val fieldData = FieldData.from(bridge, usingFieldMeta.field!!)
            val usingType = when (usingFieldMeta.usingType) {
                InnerUsingType.Get -> FieldUsingType.Read
                InnerUsingType.Put -> FieldUsingType.Write
                else -> throw IllegalArgumentException("Unknown using type: ${usingFieldMeta.usingType}")
            }
            return UsingFieldData(fieldData, usingType)
        }
    }
}