import{_ as i,M as d,p as r,q as n,R as e,t,N as o,a1 as a}from"./framework-96b046e1.js";const s={},c=a('<h1 id="basic-knowledge" tabindex="-1"><a class="header-anchor" href="#basic-knowledge" aria-hidden="true">#</a> Basic knowledge</h1><p>You will need some basic knowledge in order to use DexKit more effectively, including but not limited to:</p><ul><li>Dex disassembling tools</li><li>JVM signatures <ul><li>Primitive type signatures</li><li>Reference type signatures</li><li>Array type signatures</li><li>Method signatures</li><li>Field signatures</li></ul></li></ul><h2 id="decompilation-tool" tabindex="-1"><a class="header-anchor" href="#decompilation-tool" aria-hidden="true">#</a> Decompilation Tool</h2>',4),g={href:"https://github.com/skylot/jadx",target:"_blank",rel:"noopener noreferrer"},h=a('<h2 id="jvm-signature" tabindex="-1"><a class="header-anchor" href="#jvm-signature" aria-hidden="true">#</a> JVM signature</h2><h3 id="primitive-type-signature" tabindex="-1"><a class="header-anchor" href="#primitive-type-signature" aria-hidden="true">#</a> Primitive type signature</h3><table><thead><tr><th style="text-align:left;">type signature</th><th style="text-align:left;">Primitive type</th><th style="text-align:left;">size (bytes)</th></tr></thead><tbody><tr><td style="text-align:left;">V</td><td style="text-align:left;">void</td><td style="text-align:left;">-</td></tr><tr><td style="text-align:left;">Z</td><td style="text-align:left;">boolean</td><td style="text-align:left;">1</td></tr><tr><td style="text-align:left;">B</td><td style="text-align:left;">byte</td><td style="text-align:left;">1</td></tr><tr><td style="text-align:left;">C</td><td style="text-align:left;">char</td><td style="text-align:left;">2</td></tr><tr><td style="text-align:left;">S</td><td style="text-align:left;">short</td><td style="text-align:left;">2</td></tr><tr><td style="text-align:left;">I</td><td style="text-align:left;">int</td><td style="text-align:left;">4</td></tr><tr><td style="text-align:left;">J</td><td style="text-align:left;">long</td><td style="text-align:left;">8</td></tr><tr><td style="text-align:left;">F</td><td style="text-align:left;">float</td><td style="text-align:left;">4</td></tr><tr><td style="text-align:left;">D</td><td style="text-align:left;">double</td><td style="text-align:left;">8</td></tr></tbody></table><h3 id="reference-type-signature" tabindex="-1"><a class="header-anchor" href="#reference-type-signature" aria-hidden="true">#</a> Reference type signature</h3><p>Reference data types include classes, interfaces, arrays, etc. The type signature for classes and interfaces is denoted by <code>L</code>, followed by the fully qualified name of the class, ending with <code>;</code>, such as <code>Ljava/lang/String;</code>.</p><p>e.g.</p><table><thead><tr><th style="text-align:left;">type signature</th><th style="text-align:left;">type in java</th></tr></thead><tbody><tr><td style="text-align:left;">Ljava/lang/String;</td><td style="text-align:left;">java.lang.String</td></tr><tr><td style="text-align:left;">Ljava/util/List;</td><td style="text-align:left;">java.util.List</td></tr></tbody></table><h3 id="array-type-signature" tabindex="-1"><a class="header-anchor" href="#array-type-signature" aria-hidden="true">#</a> Array type signature</h3><p>Array type signatures begin with <code>[</code> and are followed by the type signature of the array elements, for example, <code>[[I</code> represents a two-dimensional array with elements of type <code>int</code>.</p><p>e.g.</p><table><thead><tr><th style="text-align:left;">type signature</th><th style="text-align:left;">type in java</th></tr></thead><tbody><tr><td style="text-align:left;">[I</td><td style="text-align:left;">int[]</td></tr><tr><td style="text-align:left;">[[C</td><td style="text-align:left;">char[][]</td></tr><tr><td style="text-align:left;">[Ljava/lang/String;</td><td style="text-align:left;">java.lang.String[]</td></tr></tbody></table><h3 id="method-signature" tabindex="-1"><a class="header-anchor" href="#method-signature" aria-hidden="true">#</a> Method signature</h3><p>Method signatures are composed of the return type signature and parameter type signatures of the method, For example, <code>()V</code> represents a <code>void</code> method with no parameters.</p><p>e.g.</p><blockquote><p>To make it easier to express, all method names are <code>function</code>.</p></blockquote><table><thead><tr><th style="text-align:left;">method signature</th><th style="text-align:left;">method declare in java</th></tr></thead><tbody><tr><td style="text-align:left;">()V</td><td style="text-align:left;">void function()</td></tr><tr><td style="text-align:left;">(I)V</td><td style="text-align:left;">void function(int)</td></tr><tr><td style="text-align:left;">(II)V</td><td style="text-align:left;">void function(int, int)</td></tr><tr><td style="text-align:left;">(Ljava/lang/String;)V</td><td style="text-align:left;">void function(java.lang.String)</td></tr><tr><td style="text-align:left;">([I)V</td><td style="text-align:left;">void function(int[])</td></tr><tr><td style="text-align:left;">([[Ljava/lang/String;)V</td><td style="text-align:left;">void function(java.lang.String[][])</td></tr></tbody></table><h2 id="dalvik-descriptor" tabindex="-1"><a class="header-anchor" href="#dalvik-descriptor" aria-hidden="true">#</a> Dalvik descriptor</h2><p>In dex, we should express a specific method/field through the <code>Dalvik descriptor</code>.</p><h3 id="method-descriptor" tabindex="-1"><a class="header-anchor" href="#method-descriptor" aria-hidden="true">#</a> Method descriptor</h3><p>The format of a method description is <code>[ClassTypeSignature]-&gt;[MethodName][MethodSignature]</code>, such as <code>Ljava/lang/String;-&gt;length()I</code>.</p><blockquote><p><strong>Note</strong>： In <code>Dalvik description</code>, the method name for a constructor is <code>&lt;init&gt;</code>, and the method name for a static initialization function is <code>&lt;clinit&gt;</code>.</p></blockquote><h3 id="field-descriptor" tabindex="-1"><a class="header-anchor" href="#field-descriptor" aria-hidden="true">#</a> Field descriptor</h3><p>The format of a field description is <code>[ClassTypeSignature]-&gt;[FieldName]:[TypeSignature]</code>, such as <code>Ljava/lang/String;-&gt;count:I</code>.</p><blockquote><p><strong>Note</strong>: DexKit query parameters support the input of either a signature or the original Java writing, for example:</p><ul><li><p>For className related query parameters, you can input <code>Ljava/lang/String;</code> or <code>java.lang.String</code>, while <code>java/lang/String</code> is not supported.</p></li><li><p>For <code>fieldType</code>/<code>returnType</code> related query parameters, you can input <code>I</code> or <code>int</code>.</p></li></ul></blockquote>',24);function f(y,p){const l=d("ExternalLinkIcon");return r(),n("div",null,[c,e("p",null,[t("Under normal circumstances, "),e("a",g,[t("jadx"),o(l)]),t(" is enough to meet most of the requirements, as long as the Java code is restored to some extent.")]),h])}const x=i(s,[["render",f],["__file","knowledge.html.vue"]]);export{x as default};