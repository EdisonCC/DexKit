// automatically generated by the FlatBuffers compiler, do not modify

package org.luckypray.dexkit.schema

import com.google.flatbuffers.BaseVector
import com.google.flatbuffers.BooleanVector
import com.google.flatbuffers.ByteVector
import com.google.flatbuffers.Constants
import com.google.flatbuffers.DoubleVector
import com.google.flatbuffers.FlatBufferBuilder
import com.google.flatbuffers.FloatVector
import com.google.flatbuffers.LongVector
import com.google.flatbuffers.StringVector
import com.google.flatbuffers.Struct
import com.google.flatbuffers.Table
import com.google.flatbuffers.UnionVector
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.sign

@Suppress("unused")
internal class `-OpCodesMatcher` : Table() {

    fun __init(_i: Int, _bb: ByteBuffer)  {
        __reset(_i, _bb)
    }
    fun __assign(_i: Int, _bb: ByteBuffer) : `-OpCodesMatcher` {
        __init(_i, _bb)
        return this
    }
    fun opCodes(j: Int) : Short {
        val o = __offset(4)
        return if (o != 0) {
            bb.getShort(__vector(o) + j * 2)
        } else {
            0
        }
    }
    val opCodesLength : Int
        get() {
            val o = __offset(4); return if (o != 0) __vector_len(o) else 0
        }
    val opCodesAsByteBuffer : ByteBuffer get() = __vector_as_bytebuffer(4, 2)
    fun opCodesInByteBuffer(_bb: ByteBuffer) : ByteBuffer = __vector_in_bytebuffer(_bb, 4, 2)
    fun mutateOpCodes(j: Int, opCodes: Short) : Boolean {
        val o = __offset(4)
        return if (o != 0) {
            bb.putShort(__vector(o) + j * 2, opCodes)
            true
        } else {
            false
        }
    }
    val matchType : Byte
        get() {
            val o = __offset(6)
            return if(o != 0) bb.get(o + bb_pos) else 0
        }
    fun mutateMatchType(matchType: Byte) : Boolean {
        val o = __offset(6)
        return if (o != 0) {
            bb.put(o + bb_pos, matchType)
            true
        } else {
            false
        }
    }
    val opCodeCount : `-IntRange`? get() = opCodeCount(`-IntRange`())
    fun opCodeCount(obj: `-IntRange`) : `-IntRange`? {
        val o = __offset(8)
        return if (o != 0) {
            obj.__assign(__indirect(o + bb_pos), bb)
        } else {
            null
        }
    }
    companion object {
        fun validateVersion() = Constants.FLATBUFFERS_23_5_26()
        fun getRootAsOpCodesMatcher(_bb: ByteBuffer): `-OpCodesMatcher` = getRootAsOpCodesMatcher(_bb, `-OpCodesMatcher`())
        fun getRootAsOpCodesMatcher(_bb: ByteBuffer, obj: `-OpCodesMatcher`): `-OpCodesMatcher` {
            _bb.order(ByteOrder.LITTLE_ENDIAN)
            return (obj.__assign(_bb.getInt(_bb.position()) + _bb.position(), _bb))
        }
        fun createOpCodesMatcher(builder: FlatBufferBuilder, opCodesOffset: Int, matchType: Byte, opCodeCountOffset: Int) : Int {
            builder.startTable(3)
            addOpCodeCount(builder, opCodeCountOffset)
            addOpCodes(builder, opCodesOffset)
            addMatchType(builder, matchType)
            return endOpCodesMatcher(builder)
        }
        fun startOpCodesMatcher(builder: FlatBufferBuilder) = builder.startTable(3)
        fun addOpCodes(builder: FlatBufferBuilder, opCodes: Int) = builder.addOffset(0, opCodes, 0)
        fun createOpCodesVector(builder: FlatBufferBuilder, data: ShortArray) : Int {
            builder.startVector(2, data.size, 2)
            for (i in data.size - 1 downTo 0) {
                builder.addShort(data[i])
            }
            return builder.endVector()
        }
        fun startOpCodesVector(builder: FlatBufferBuilder, numElems: Int) = builder.startVector(2, numElems, 2)
        fun addMatchType(builder: FlatBufferBuilder, matchType: Byte) = builder.addByte(1, matchType, 0)
        fun addOpCodeCount(builder: FlatBufferBuilder, opCodeCount: Int) = builder.addOffset(2, opCodeCount, 0)
        fun endOpCodesMatcher(builder: FlatBufferBuilder) : Int {
            val o = builder.endTable()
            return o
        }
    }
}