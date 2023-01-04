import{_ as r,M as a,p as t,q as p,N as e,V as o,a1 as i,R as s,t as l}from"./framework-96b046e1.js";const A={},y=i(`<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><blockquote><p>这是一个使用 C++ 实现的高性能 dex 解析库，用于运行时查找被混淆的类、方法或者属性。</p></blockquote><h2 id="开发背景" tabindex="-1"><a class="header-anchor" href="#开发背景" aria-hidden="true">#</a> 开发背景</h2><p>最开始是因为模块开发需求，需要查找对于某些特定字符串的调用，咕咕华写的工具类看不懂（<s>咕咕华全责！</s>），于是自己去学习了一轮 Dalvik 字节码， 然后使用 Java 实现了一个功能较为简单的 Dex 解析库，但是由于支持的 API 过少，所以仅限于模块内部使用并没有独立出来。</p><p>后来由于某段时间<code>太极</code>对于 JIT 的特殊处理，导致 Dex 解析过程中的代码未被 JIT 优化编译成本地代码。所以执行速度极慢，在 Android12 上甚至需要 2分钟左右才能完成全部流程，于是就有了使用 C++ 重写的想法（<s>虽然这个想法在很久以前就有了，咕咕咕</s>）。</p><h2 id="支持的功能" tabindex="-1"><a class="header-anchor" href="#支持的功能" aria-hidden="true">#</a> 支持的功能</h2><ul><li>批量搜索指定字符串的方法/类</li><li>查找使用了指定字符串的方法/类</li><li>方法调用/被调用搜索</li><li>直系子类搜索</li><li>方法多条件搜索</li><li>op序列搜索(仅支持标准dex指令)</li><li>注解搜索（目前仅支持搜索value为字符串的查找）</li></ul><h2 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h2><h3 id="样例-app-代码" tabindex="-1"><a class="header-anchor" href="#样例-app-代码" aria-hidden="true">#</a> 样例 APP 代码</h3><blockquote><p>假设这是一个宿主 APP 的被混淆后的代码，我们需要对这个方法的 hook 进行动态适配，由于混淆的存在，可能每个版本方法名以及类名都会发生变化</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="shiki" style="background-color:#22272e;"><code><span class="line"><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">class</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">abc</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">public</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">boolean</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">cvc</span><span style="color:#ADBAC7;">() {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">boolean</span><span style="color:#F69D50;"> </span><span style="color:#ADBAC7;">b</span><span style="color:#F69D50;"> </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">false</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#768390;">// ...</span></span>
<span class="line"><span style="color:#ADBAC7;">        Log.</span><span style="color:#DCBDFB;">d</span><span style="color:#ADBAC7;">(</span><span style="color:#96D0FF;">&quot;VipCheckUtil&quot;</span><span style="color:#ADBAC7;">, </span><span style="color:#96D0FF;">&quot;info: xxxx&quot;</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#768390;">// ...</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#F47067;">return</span><span style="color:#ADBAC7;"> b;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="xposed-hook-代码" tabindex="-1"><a class="header-anchor" href="#xposed-hook-代码" aria-hidden="true">#</a> Xposed Hook 代码</h3><blockquote><p>通过创建 <code>DexKitBridge</code> 实例，我们可以对 APP 的 dex 进行特定的查找，但是切记实例化只需要进行一次，请自行存储，不要重复创建。 且在使用完毕后，需要调用 <code>DexKitBridge.close()</code> 方法，释放内存，否则会造成内存泄漏。</p></blockquote>`,13),D=s("div",{class:"language-kotlin line-numbers-mode","data-ext":"kt"},[s("pre",{class:"shiki",style:{"background-color":"#22272e"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#F47067"}},"@Throws"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#F69D50"}},"NoSuchMethodException"),s("span",{style:{color:"#ADBAC7"}},"::"),s("span",{style:{color:"#6CB6FF"}},"class"),s("span",{style:{color:"#ADBAC7"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F47067"}},"fun"),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#DCBDFB"}},"vipHook"),s("span",{style:{color:"#ADBAC7"}},"() {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"    "),s("span",{style:{color:"#F47067"}},"val"),s("span",{style:{color:"#ADBAC7"}}," apkPath "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," hostApp.applicationInfo.sourceDir")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"    "),s("span",{style:{color:"#F69D50"}},"DexKitBridge"),s("span",{style:{color:"#ADBAC7"}},".create(apkPath)?.use { bridge "),s("span",{style:{color:"#F47067"}},"->")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F47067"}},"val"),s("span",{style:{color:"#ADBAC7"}}," resultMap "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," bridge.batchFindMethodsUsingStrings(")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            "),s("span",{style:{color:"#F69D50"}},"BatchFindArgs"),s("span",{style:{color:"#ADBAC7"}},".build { ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"                addQuery("),s("span",{style:{color:"#96D0FF"}},'"VipCheckUtil_isVip"'),s("span",{style:{color:"#ADBAC7"}},", "),s("span",{style:{color:"#6CB6FF"}},"setOf"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#96D0FF"}},'"VipCheckUtil"'),s("span",{style:{color:"#ADBAC7"}},", "),s("span",{style:{color:"#96D0FF"}},'"userInfo:"'),s("span",{style:{color:"#ADBAC7"}},"))")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            }")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        )")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F47067"}},"val"),s("span",{style:{color:"#ADBAC7"}}," result "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," resultMap["),s("span",{style:{color:"#96D0FF"}},'"VipCheckUtil_isVip"'),s("span",{style:{color:"#ADBAC7"}},"]"),s("span",{style:{color:"#F47067"}},"!!")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F47067"}},"assert"),s("span",{style:{color:"#ADBAC7"}},"(result.size "),s("span",{style:{color:"#F47067"}},"=="),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#6CB6FF"}},"1"),s("span",{style:{color:"#ADBAC7"}},")")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F47067"}},"val"),s("span",{style:{color:"#ADBAC7"}}," method"),s("span",{style:{color:"#F47067"}},":"),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#F69D50"}},"Method"),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," methodDescriptor["),s("span",{style:{color:"#6CB6FF"}},"0"),s("span",{style:{color:"#ADBAC7"}},"]")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            .getMethodInstance(hostClassLoader)")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F69D50"}},"XposedBridge"),s("span",{style:{color:"#ADBAC7"}},".hookMethod(method, "),s("span",{style:{color:"#F69D50"}},"XC_MethodReplacement"),s("span",{style:{color:"#ADBAC7"}},".returnConstant("),s("span",{style:{color:"#6CB6FF"}},"true"),s("span",{style:{color:"#ADBAC7"}},"))")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"    }")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"}")]),l(`
`),s("span",{class:"line"})])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),d=s("div",{class:"language-java line-numbers-mode","data-ext":"java"},[s("pre",{class:"shiki",style:{"background-color":"#22272e"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#F47067"}},"public"),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#F47067"}},"void"),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#DCBDFB"}},"vipHook"),s("span",{style:{color:"#ADBAC7"}},"() throws NoSuchMethodException {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"    String"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#ADBAC7"}},"apkPath"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," HostInfo."),s("span",{style:{color:"#DCBDFB"}},"getHostApp"),s("span",{style:{color:"#ADBAC7"}},"()."),s("span",{style:{color:"#DCBDFB"}},"getApplicationInfo"),s("span",{style:{color:"#ADBAC7"}},"().sourceDir;")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"    "),s("span",{style:{color:"#F47067"}},"try"),s("span",{style:{color:"#ADBAC7"}}," (DexKitBridge"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#ADBAC7"}},"bridge"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," DexKitBridge."),s("span",{style:{color:"#DCBDFB"}},"create"),s("span",{style:{color:"#ADBAC7"}},"(apkPath)) {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F47067"}},"if"),s("span",{style:{color:"#ADBAC7"}}," (bridge "),s("span",{style:{color:"#F47067"}},"=="),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#6CB6FF"}},"null"),s("span",{style:{color:"#ADBAC7"}},") {")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            "),s("span",{style:{color:"#F47067"}},"return"),s("span",{style:{color:"#ADBAC7"}},";")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        }")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        Map"),s("span",{style:{color:"#F69D50"}},"<"),s("span",{style:{color:"#F47067"}},"String"),s("span",{style:{color:"#F69D50"}},", "),s("span",{style:{color:"#ADBAC7"}},"List"),s("span",{style:{color:"#F69D50"}},"<"),s("span",{style:{color:"#F47067"}},"DexMethodDescriptor"),s("span",{style:{color:"#F69D50"}},">> "),s("span",{style:{color:"#ADBAC7"}},"resultMap"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#F47067"}},"=")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            bridge."),s("span",{style:{color:"#DCBDFB"}},"batchFindMethodsUsingStrings"),s("span",{style:{color:"#ADBAC7"}},"(")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"                "),s("span",{style:{color:"#F47067"}},"new"),s("span",{style:{color:"#ADBAC7"}}," BatchFindArgs."),s("span",{style:{color:"#DCBDFB"}},"Builder"),s("span",{style:{color:"#ADBAC7"}},"()")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"                    ."),s("span",{style:{color:"#DCBDFB"}},"addQuery"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#96D0FF"}},'"VipCheckUtil_isVip"'),s("span",{style:{color:"#ADBAC7"}},", List."),s("span",{style:{color:"#DCBDFB"}},"of"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#96D0FF"}},'"VipCheckUtil"'),s("span",{style:{color:"#ADBAC7"}},", "),s("span",{style:{color:"#96D0FF"}},'"userInfo:"'),s("span",{style:{color:"#ADBAC7"}},"))")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"                    ."),s("span",{style:{color:"#DCBDFB"}},"build"),s("span",{style:{color:"#ADBAC7"}},"()")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            );")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        List"),s("span",{style:{color:"#F69D50"}},"<"),s("span",{style:{color:"#F47067"}},"DexMethodDescriptor"),s("span",{style:{color:"#F69D50"}},"> "),s("span",{style:{color:"#ADBAC7"}},"result"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," Objects."),s("span",{style:{color:"#DCBDFB"}},"requireNonNull"),s("span",{style:{color:"#ADBAC7"}},"(resultMap."),s("span",{style:{color:"#DCBDFB"}},"get"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#96D0FF"}},'"VipCheckUtil_isVip"'),s("span",{style:{color:"#ADBAC7"}},"));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        "),s("span",{style:{color:"#F47067"}},"assert"),s("span",{style:{color:"#ADBAC7"}}," result."),s("span",{style:{color:"#DCBDFB"}},"size"),s("span",{style:{color:"#ADBAC7"}},"() "),s("span",{style:{color:"#F47067"}},"=="),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#6CB6FF"}},"1"),s("span",{style:{color:"#ADBAC7"}},";")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        DexMethodDescriptor"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#ADBAC7"}},"descriptor"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," result."),s("span",{style:{color:"#DCBDFB"}},"get"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#6CB6FF"}},"0"),s("span",{style:{color:"#ADBAC7"}},");")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        Method"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#ADBAC7"}},"isVipMethod"),s("span",{style:{color:"#F69D50"}}," "),s("span",{style:{color:"#F47067"}},"="),s("span",{style:{color:"#ADBAC7"}}," descriptor."),s("span",{style:{color:"#DCBDFB"}},"get"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#6CB6FF"}},"0"),s("span",{style:{color:"#ADBAC7"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"            ."),s("span",{style:{color:"#DCBDFB"}},"getMethodInstance"),s("span",{style:{color:"#ADBAC7"}},"(HostInfo."),s("span",{style:{color:"#DCBDFB"}},"getHostClassLoader"),s("span",{style:{color:"#ADBAC7"}},"());")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"        XposedBridge."),s("span",{style:{color:"#DCBDFB"}},"hookMethod"),s("span",{style:{color:"#ADBAC7"}},"(isVipMethod, XC_MethodReplacement."),s("span",{style:{color:"#DCBDFB"}},"returnConstant"),s("span",{style:{color:"#ADBAC7"}},"("),s("span",{style:{color:"#6CB6FF"}},"true"),s("span",{style:{color:"#ADBAC7"}},"));")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"    }")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"}")]),l(`
`),s("span",{class:"line"})])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),B=s("p",null,"怎么样？是不是很简单！只需短短几行代码就完成了动态混淆的适配。",-1),C=s("p",null,[l("现在，借助性能强劲的 "),s("code",null,"DexKit"),l("，可以快速的完成混淆的定位。")],-1),u=s("p",null,[l("下面我们来学习一下 "),s("code",null,"DexKit"),l(" 的使用方法。")],-1);function F(h,b){const n=a("CodeGroupItem"),c=a("CodeGroup");return t(),p("div",null,[y,e(c,null,{default:o(()=>[e(n,{title:"kotlin"},{default:o(()=>[D]),_:1}),e(n,{title:"java"},{default:o(()=>[d]),_:1})]),_:1}),B,C,u])}const m=r(A,[["render",F],["__file","home.html.vue"]]);export{m as default};