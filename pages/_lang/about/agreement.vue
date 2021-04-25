<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="agreement margin flex">
      <div class="container">
        <div class="cons">
          <h1>{{$t('message.用户协议')}}</h1>
          <div class="infos">
            <span>{{$t('message.币小宝官方')}}</span>
            {{newsData.crate_date|changeFormatDate}}
          </div>
          <div class="datails">
            <div v-if="$store.state.locale === 'cn'" class="showCoon">
              <p>您在使用北京令牌科技有限公司（以下简称“公司”或“我们”）所经营的币小宝数字货币行情平台（以下简称“币小宝”，包括域名为bixiaobao.com的网站、币小宝App、币小宝微信公众号、币小宝微信小程序等）提供的产品和/或服务前，请您仔细阅读《币小宝服务协议》（以下简称“本协议”），本协议是您与公司之间关于您注册、登录、使用币小宝所订立的相关权利义务协议，如您对本协议的内容有任何疑问请及时咨询公司客服。当您勾选页面单选框，点击“确认”或“同意”按钮，同意本协议后，或在我们更新本协议后（我们会及时提示您更新的情况）勾选页面单选框，点击“确认”或“同意”按钮并继续使用币小宝提供的产品与/或服务，即表示您已充分阅读、理解并接受本协议的全部内容，您接受并将遵守本协议约定。</p>
              <p>我们可能会根据情况不时地更新本协议的内容，但是均会通过币小宝公告或者私信通知或弹窗更新提示等方式告知您；本协议一旦修改后将替换币小宝之前的服务协议，如您对修改后的本协议有疑问请及时联系公司客服。若您不同意本协议及/或公司对其的修正或更改，请您立即停止使用币小宝所提供的全部服务和/或产品，如您点击“同意”或“确认”并继续使用，则视为接受本协议的变更，并同意以后在使用币小宝提供的全部服务和/或产品时须遵循新的服务协议。</p>
              <p>本协议中的“用户”包括注册用户及非注册用户。凡未注册币小宝帐号的用户，自使用币小宝提供的产品与/或服务时即自动成为币小宝的“非注册用户”，须遵循除本协议用户注册规定以外的其他所有条款。</p>
              <p>币小宝主要为您提供专业的数字货币实时行情、趋势分析、行业资讯等内容以及数字货币个人主页、资产记帐、信息发布、社区交流等服务。我们秉承工匠精神，通过大数据技术对海量数据进行多维度、多层级处理，将最有价值的内容分享给用户。公司会根据自身业务发展不时的调整币小宝提供的产品与/或服务以便为您提供更优质的体验。</p>
              <h4>一、使用规则</h4>
              <p>1.您无需用户帐号即可使用币小宝提供的产品与/或服务。但某些币小宝产品与/或服务的功能需要您注册币小宝帐号。如果您想使用币小宝提供的更多功能，您必须注册相应帐号并且于注册页面上提供相关的个人信息。您可以按照币小宝的说明随时终止使用您的帐号，我们将会依据本协议规定保留或终止您的帐号。</p>
              <p>2.如您需要使用币小宝开放平台发布信息服务，除了需要注册币小宝帐号以外，您还需要向我们提交认证申请，我们对您的认证申请审核通过后，您即可使用您本人的币小宝帐号使用币小宝开放平台发布信息。</p>
              <p>3.您充分了解并同意，为了更好地促进信息分享及宣传推广，您授权币小宝可在币小宝及其关联公司产品和服务上使用您在币小宝开放平台上发布的任何公开信息，以及为宣传推广之目的将前述内容许可给第三方使用。您对币小宝及其关联公司的前述授权并不改变您对前述内容的所有权及知识产权归属，也并不影响您行使对前述内容的合法权利。</p>
              <p>4.您充分了解并同意，币小宝仅为您提供数字货币行情大数据分析平台，所有内容仅供参考，不构成投资建议或者其他实际的操作意见，您应对币小宝中的内容自行加以判断并对据此操作所造成的后果自行负责。</p>
              <p>5.您充分了解，币小宝提供的产品与/或服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其他软件或访问的其他网站中含有“特洛伊木马”等病毒，威胁到用户的计算机信息和数据的安全，继而影响币小宝产品与/或服务的正常使用等等。您应加强信息安全及使用者资料的保护意识，要注意加强密码保护，以免遭致损失和骚扰。</p>
              <p>6.您充分了解并同意，我们保留因业务发展需要享有单方面对币小宝提供的产品与/或服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，您需承担此风险。我们更新本协议相关条款后，用户可重新下载安装币小宝或在币小宝官方网站查阅最新版币小宝服务协议。在我们更新本协议后，如果用户不接受修改后的条款，请立即停止使用币小宝提供的产品与/或服务。</p>
              <p>7.币小宝提供的产品与/或服务中可能包括广告，您同意在使用过程中显示币小宝和第三方供应商、合作伙伴提供的广告。</p>
              <p>8.我们可依其合理判断，对违反有关法律法规或本协议约定，或侵犯、妨害、威胁任何人权利或安全的内容，或者假冒他人的行为，我们有权依法停止传输、发布任何前述内容，并有权依其自行判断对违反本条款的任何人士采取适当的法律行动，包括但不限于，从币小宝提供的产品与/或服务中删除具有违法性、侵权性、不当性等内容，终止违反者的用户资格，阻止其使用币小宝提供全部或部分产品与/或服务，并且依据法律法规保存有关信息并向有关部门报告等。如经司法部门确认我们上述判断有误，我们根据我国相关法律承担由此造成的责任。</p>
              <p>9.我们保留在任何时候通过为您提供币小宝替换、修改、升级版本的权利以及为替换、修改或升级收取费用的权利，用户可选择更新或拒绝更新新的版本。但是，币小宝新版本发布后，我们不保证旧版币小宝的继续可用。我们保留因业务发展需要，单方面对币小宝的部分功能效果进行改变或进行限制，用户需承担此风险。</p>
              <p>10.公司和/或合作单位将根据市场与技术的发展，向用户提供与币小宝相关的各种互联网以及移动通信增值服务，包括免费和收费的增值服务。公司和/或合作单位保留对相关增值服务收取费用及改变收费标准、方式的权利，如相关服务由免费变更为收费服务，公司和/或合作单位将以适当的形式通知，用户可自主选择接受或拒绝收费服务，并保证在使用收费服务时，将按照公司和/或合作单位相关收费规定支付费用，否则公司有权不向用户提供该收费服务。</p>
              <p>
                11.用户权利及义务：
                <br />（1）币小宝帐号的所有权归公司所有，用户完成申请注册手续后，获得币小宝帐号的使用权，该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。公司因本协议的相关规定，有权回收用户的币小宝帐号。
                <br />（2）用户须对在币小宝上的注册信息的真实性、合法性、有效性承担全部责任。同时用户不得冒充他人、不得利用他人的名义传播任何信息；不得恶意使用注册帐号导致其他用户误认；否则公司有权立即停止提供服务，收回币小宝帐号并由您独自承担由此而产生的一切法律责任。
                <br />（3）用户须对在币小宝上所传输、发布信息的真实性、合法性、无害性、有效性等全权负责，与用户所传输、发布的信息相关的任何法律责任由用户自行承担，与公司无关。
                <br />（4）用户有权更改、删除在币小宝上的个人资料、注册信息及传输、发布的信息等内容，但需注意，删除有关内容的同时也会删除任何您储存在系统中的文字和图片，用户需承担该风险。
                <br />（5）为了保障用户帐号信息安全：用户有责任妥善保管注册帐号信息、帐号密码以及此帐号下发生的包括网络交易在内的任何活动的安全；用户需要对注册帐号以及密码下的行为承担法律责任；当发生非本人授权的帐号或密码登录或任何违反服务条款的登录，用户须立即通知公司；由于他人使用自己帐号和密码而导致公司或币小宝其他用户的任何损失，用户须对此负责；任何情况下用户不得使用除自己帐号以外的其他任何帐号登录，否则公司有权冻结并审查此类帐号。
                <br />（6）用户应遵守本协议的各项条款，正确、适当地使用币小宝提供的产品与/或服务，如因用户违反本协议中的任何条款，公司有权依据协议终止向违约用户帐号提供币小宝产品与/或服务。同时，公司保留在任何时候收回币小宝帐号、用户名的权利。
                <br />（7）用户注册币小宝帐号后如果长期（自注册之日起超过3个月）不登录该帐号，公司有权通知您回收该帐号并清除您相关的注册信息，以免造成资源浪费，由此带来问题均由用户自行承担。
                <br />（8）用户不得利用币小宝或币小宝提供的产品与/或服务制作、上载、复制、传输、发布以下内容：
                <br />1）反对宪法所确定的基本原则的；
                <br />2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
                <br />3）损害国家荣誉和利益的；
                <br />4）煽动民族仇恨、民族歧视，破坏民族团结的；
                <br />5）破坏国家宗教政策，宣扬邪教和封建迷信的；
                <br />6）散布谣言，扰乱社会秩序，破坏社会稳定的；
                <br />7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
                <br />8）侮辱或者诽谤他人，侵害他人合法权益的；
                <br />9）含有法律、行政法规禁止的其他内容的信息。
                <br />10）币小宝相关服务规则规定的禁止制作、上载、复制、传输、发布的内容。
                <br />（9）用户在使用币小宝提供的产品和/或服务前，同意不会有以下行为，否则用户对因违反上述限制而造成的任何损害承担全部责任：
                <br />1）利用币小宝提供的产品和/或服务从事任何违法活动；
                <br />2）尝试使用未经授权的方式访问服务的任何部分或任何币小宝服务器网络；
                <br />3）侵犯任何个人或实体的权利，包括但不限于其知识产权，隐私，形象或合同权利；
                <br />4）干扰或损坏服务的任何部分，包括但不限于使用病毒，僵尸程序，特洛伊木马，有害代码，DDOS攻击，拒绝服务攻击，数据包或IP欺骗，伪造路由或电子邮件地址信息或类似方法或技术；
                <br />5）在无公司的明确书面许可的情况下使用脚本、机器人、爬虫或其他自动机制收集信息或以其他方式与服务交互；
                <br />6）未经公司书面许可以向他人出售牟利为目的使用币小宝的任何内容，此种使用包括不限于以任何形式复制、仿制、修改、分发、转让、出售、出版、广播、执行、传输、许可或传播币小宝提供的产品和/或服务的任何部分或内容。
                <br />（10）您一旦违反违反本协议或币小宝相关服务规则的规定，我们有权随时注销您的帐号以及删除您在币小宝上发布的所有信息。
                <br />（11）我们注销您的帐号后，不排除还会保留您在币小宝上所发布的信息。若您需要删除在币小宝上所发布的信息，可随时通过本协议“七、联系方式”中的联系方式联系我们进行处理。
              </p>
              <h4>二、免责声明</h4>
              <p>1.用户违反本协议或币小宝相关服务规则的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户同意赔偿公司与合作公司、关联公司，并使之免受损害。</p>
              <p>2.用户因第三方如电信部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力原因而遭受的一切损失，公司及合作单位不承担责任。</p>
              <p>3.因技术故障等不可抗事件影响到服务的正常运行的，公司及合作单位承诺在第一时间内与相关单位配合，及时处理进行修复，但用户因此而遭受的一切损失，公司及合作单位不承担责任。</p>
              <p>4.用户须明白，使用币小宝提供的产品和/或服务因涉及Internet服务，可能会受到各个环节不稳定因素的影响。因此，币小宝提供的产品和/或服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险。用户须承担以上风险，公司不作担保。对因此导致用户不能发送和接受阅读信息、或接发错信息，公司不承担任何责任。</p>
              <p>5.用户须明白，在使用币小宝提供的产品和/或服务过程中存在有来自任何他人的包括威胁性的、诽谤性的、令人反感的或非法的内容或行为或对他人权利的侵犯（包括知识产权）的匿名或冒名的信息的风险，用户须承担以上风险，公司和合作公司对币小宝提供的产品和/或服务不作任何类型的担保，不论是明确的或隐含的，包括所有有关信息真实性、适当性、适于某一特定用途、所有权和非侵权性的默示担保和条件，对因此导致任何因用户不正当或非法使用币小宝提供的产品和/或服务产生的直接、间接、偶然、特殊及后续的损害，不承担任何责任。</p>
              <p>6.用户须明白，公司对币小宝提供的产品和/或服务内容力求准确、完整和及时，但并不对其准确性、完整性和及时性做出任何保证。对任何因直接或间接使用币小宝提供的产品和/或服务内容而造成的损失，包括但不限于因有关产品和/或服务内容不准确、不完整而导致的损失，公司不承担任何法律责任。公司亦不保证所设置的外部链接的准确性和完整性。用户通过币小宝与其他网站的链接而获得其他网站内容，其风险责任自负，公司对此不承担任何法律责任。</p>
              <p>7.在任何情况下，公司均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用币小宝提供的产品和/或服务而遭受的利润损失承担责任（即使公司已被告知该等损失的可能性亦然）。公司对您承担的全部责任，无论因何原因或何种行为方式，将在法律规定的范围内承担责任。</p>
              <p>8.就下列相关事宜的发生，公司不承担任何法律责任：</p>
              <p>
                （1）公司根据法律规定或相关政府的要求提供您的个人信息；
                <br />（2）由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人信息的泄漏，或其他非因公司原因导致的个人信息的泄漏；
                <br />（3）任何第三方根据币小宝服务协议及公司声明中所列明的情况使用您的个人信息，由此所产生的纠纷；
                <br />（4）任何由于黑客攻击、电脑病毒侵入或政府管制而造成的暂时性网站关闭；
                <br />（5）因不可抗力导致的任何后果；
                <br />（6）公司在币小宝服务协议及公司声明中列明的使用方式或免责情形。
              </p>
              <p>9.用户须明白，币小宝提供的产品和/或服务中可能包含第三方供应商和合作伙伴广告，公司将尽合理努力对于广告主和广告内容进行审核，但是公司无法向您保证您通过该广告获得或体验的最终服务或产品的真实性、合法性及完全符合您的预期做任何保证和担保。</p>
              <p>10.公司因发展战略的调整，可能会需要对您已经使用的币小宝产品或服务进行调整（包括但不限于变更、暂停、限制、终止或撤销您在币小宝享有的权益），如相关调整可能影响到您的权益我们将会提前通知，但我们无法保证该调整最终不会对您的权益不产生任何影响。</p>
              <p>11.币小宝提供的产品和/或服务可能是由第三方提供或者与第三方合作方共同提供，公司无法对该产品和/或服务（特别是第三方独立提供的部分）的完整性、真实性及完全符合您的预期；如果您通过币小宝提供的产品和/或服务使用第三方的产品或服务（特别是购买第三方的产品和/或服务）请您务必仔细阅读第三方服务方的产品和/服务规范与政策并自行做出合理判断。</p>
              <p>12.对于用户在币小宝上发布的信息，我们会事先对该信息内容进行初步审核，审核通过后该信息方可发布。但由于用户发布的信息较多，我们无法保证用户发布的所有信息均不存在侵犯第三人合法权益的情况，另外，我们将对非个人用户发布的信息采取事后监督机制。因此，如果您发现币小宝上用户所发布的信息存在侵权或违法违规的情况，请您立刻通过本协议“七、联系方式”中的联系方式联系我们进行处理，但我们并不对用户发布信息所导致的任何后果及法律责任负责，一切后果及法律责任均由用户自行承担。</p>
              <p>13.权利人认为币小宝所提供的信息存储空间、搜索或链接服务存储、搜索或链接的内容所涉及的作品侵犯了其信息网络传播权或者被删除、改变了自己的权利管理电子信息的，可依法向币小宝提交书面通知。权利人应对通知书的真实性负责，并承担由于通知书内容不真实所导致的全部法律责任。</p>
              <h4>三、隐私政策</h4>
              <p>请查阅我们的《币小宝隐私政策》，《币小宝隐私政策》为与本协议效力等同且不可分割的一部分。</p>
              <h4>四、知识产权保护</h4>
              <p>
                1.知识产权声明
                <br />（1）币小宝是由公司开发。币小宝的一切版权、商标权、专利权、商业秘密等知识产权，以及与软件相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均受中华人民共和国著作权法、商标法、专利法、反不正当竞争法和相应的国际条约以及其他知识产权法律法规的保护，除涉及第三方授权的软件或技术外，公司享有上述知识产权。
                <br />（2）未经公司书面许可您不得将币小宝产品或服务本身享有的相关知识产权权利（包括但不限于商标、软著、专利）进行复制、更改、修改或通过其他方式创造衍生作品用于任何商业目的；您可以在不侵害公司声誉的情况下，以非商业目的合理使用币小宝商标；公司免费或收费为前提向您提供的任何币小宝产品和/或服务并不代表公司将该币小宝产品和/或服务相关的知识产权权利授予或转让给您使用，公司和您另有明确书面约定除外。
              </p>
              <p>
                2.授权范围
                （1）用户可以为非商业目的在单一台终端设备上安装、使用、显示、运行币小宝。用户不得为商业运营目的安装、使用、运行币小宝，不可以对币小宝或者币小宝运行过程中释放到任何计算机终端内存中的数据及币小宝运行过程中客户端与服务器端的交互数据进行复制、更改、修改、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经授权的第三方工具/服务接入币小宝和相关系统。
                <br />（2）用户不得未经公司许可，将币小宝安装在未经公司明示许可的其他终端设备上。包括但不限于机顶盒、手持设备、电话、无线上网机、游戏机、电视机、DVD机等。
                <br />（3）保留权利：未明示授权的其他一切权利仍归公司所有，用户使用其他权利时须另外取得公司的书面同意。
              </p>
              <h4>五、协议完整性</h4>
              <p>您使用币小宝提供的不同产品和/或服务时，公司可能会根据币小宝不同产品和服务的特性在制定相应的规则或通知或指引，在您使用该产品和服务时您应该遵守该相关的规则或通知或指引，该规则或通知或指引构成本协议的一个部分；公司非常重视您的个人隐私保护，已经制定了专门的隐私政策，该隐私政策亦构成本协议不可分割的一个部分。</p>
              <h4>六、争议解决</h4>
              <p>
                1.本协议适用中华人民共和国法律。
                <br />2.您同意如果因为本协议出现任何纠纷您将及时联系公司客服尽快和公司协商一致，如双方在三十日内无法协商一致的情况下，您同意向公司所在地有管辖权的人民法院提请诉讼。
              </p>
              <h4>七、联系方式</h4>
              <p>
                如您对本协议的相关事宜有任何问题、意见或建议，请联系公司。
                <br />联系邮箱：contact@bixiaobao.com；
              </p>
            </div>
            <div v-else class="showCoon">
              <p>Before you use the Bixiaobao Big Data Analysis platform operated(hereinafter referred to as "this platform", including domain name bixiaobao.com,bixiaobao App,bixiaobao Public No, bixiaobao minor procedure, etc) by Beijing lingpaikeji Technology Co., Ltd. (hereinafter referred to as "Company" or "We"), please read the following agreement carefully, Agreement on the “Services of the Bixiaobao” (hereinafter referred to as "this Agreement"). Use the rights and obligations agreement made by Bixiaobao. If you have any questions about the contents of this agreement, please consult your company's customer service promptly.When you tick the page's single-select box, click the Confirm or Consent button, agree to this Agreement, or after we update this Agreement (we will prompt you in time for updates), click the Confirm or Consent button and continue to use the products and/or services provided by Bixiaobao, which means that you have fully read, understood and accepted and accepted this Agreement.</p>
              <p>We may update the contents of this Agreement from time to time depending on the situation, but we will inform you by means of Bixiaobao announcement, private letter notice or bullet-window update reminder. This Agreement will replace Bixiaobao's prior service agreement if you have any questions regarding the amended agreement.If you do not agree with this Agreement and/or the Company's amendments or changes to it, please immediately stop using all the services and/or products provided by the coinage and if you click "agree" or "confirm" and continue to use it, you will be deemed to accept the change of this Agreement and agree to follow the new service agreement later when using all the services and/or products provided by Bixiaobao.</p>
              <p>The "Users" in this Agreement include both registered and unregistered users.Any user who is not registered with the Bixiaobao account, who automatically becomes a "non-registered user" of Bixiaobao when using the products and/or services provided by Bixiaobao, shall comply with all other terms except as required by the User Registration of this Agreement.</p>
              <p>Bixiaobao provides you with professional Cryptocurrency market information, trend analysis, industry information, and digital currency personal home page, asset bookkeeping, information dissemination, community exchange, etc.In the spirit of artisans, we handle vast amounts of data in multi-dimensional, multi-layered ways through big data technology, and share the most valuable content.To users. The company adjusts Bixiaobao's products and/or services from time to time to provide you with a better experience.</p>
              <p>All content on this website can be used in a number of languages, such as user convenience, conflict or omission, whichever is Chinese.</p>
              <h4>1.Rules of Use</h4>
              <p>1-1)You can use Bixiaobao's products and/or services without a user account.But some Bixiaobao product and/or service functions require you to register your Bixiaobao account.If you want to use more features provided by Bixiaobao, you must register the corresponding account with the registration pagerelevant personal information.You may terminate your account at any time as described in Bixiaobao, and we will retain or terminate your account in accordance with this Agreement.</p>
              <p>1-2) If you need to use the Bixiaobao Open Platform to publish information services, you need to submit an authentication application to us in addition to the Bixiaobao account. After we have approved your application, you can use your own Bixiaobao account to use Bixiaobao.information.</p>
              <p>1-3) You fully understand and agree that in order to better facilitate information sharing and promotion, you authorize Bixiaobao and its associated company products and services to use any public information you have posted on the Bixiaobao Open Platform, and to license the aforementioned content to third party for promotional purposes.Bixiaobao and its affiliates do not change your ownership and intellectual property rights of the foregoing, nor does it affect your legal rights to the foregoing.</p>
              <p>1-4) You fully understand and agree that Bixiaobao only provides you with a platform for big data analysis of digital currency quotations. All contents are for reference only and do not constitute investment advice or other practical operational advice. You should judge the contents of Bixiaobao by yourself and be responsible for the consequences of this operation.</p>
              <p>1-5) You are fully aware that Bixiaobao's products and/or services, like most Internet services, are affected by differences in factors including but not limited to user reasons, quality of network services, social environment, etc. and may be disturbed by various security issues such as the use of user information by others, causing real-life harassment; user downloads.Other software installed or accessed sites contain viruses such as Trojan horses that threaten the security of users' computer information and data, and then affect the normal use of Bixiaobao products and/or services, etc.You should enhance your awareness of information security and user data protection. You should pay attention to enhancing password protection to avoid loss and harassment.</p>
              <p>1-6) You fully understand and agree that we reserve the right to change, suspend, restrict, terminate or revoke all or part of the service provided to Bixiaobao at any time without notice due to the need for business development.After we update the relevant provisions of this Agreement,Users can re-download the installation of Bixiaobao or check the latest version of Bixiaobao Service Agreement at the Bixiaobao official website.After we update this Agreement, if the user does not accept the modified terms, please stop using the products and/or services provided by Bixiaobao immediately.</p>
              <p>1-7) Advertisements may be included in the products and/or services provided by Bixiaobao, and you agree to show Bixiaobao and third-party suppliers, partner-provided advertising during use.</p>
              <p>1-8) We may, in accordance with its reasonable judgment, take appropriate legal action against any person who contravenes the relevant laws and regulations or this Agreement, infringe, obstruct, threaten any person's rights or security, or impersonate any other person's acts, and we shall have the right to stop transmission according to law, publish any of the aforesaid contents, and to take appropriate legal action against any person who contravenes this clause, including, in accordance with his own judgment.However, it is not limited to removing illegal, infringing and improper contents from products and/or services provided by Bixiaobao, terminating the user status of the violator, preventing it from using Bixiaobao to provide all or part of the product and/or service, and keeping the relevant information in accordance with the law and reporting to the relevant departments.If we have been confirmed by the judicial authorities that we have made these judgments wrong, we shall be held responsible under the relevant laws of our country.</p>
              <p>1-9) We reserve the right to replace, modify, and upgrade Bixiaobao at any time and the right to charge for replacement, modification, or upgrade. Users can choose to update or refuse to update the new version at any time.However, after the release of the new edition of Bixiaobao, we do not guarantee the old version of Bixiaobao.Continue to be available. We reserve the risk of unilaterally changing or limiting some of Bixiaobao's functional effects due to business development needs.</p>
              <p>1-10) Companies and/or partner units will provide users with a variety of Internet and mobile value-added services related to Bixiaobao, including free and fee-charging value-added services, based on market and technology developments.The Company and/or its partners reserve the right to charge fees for the relevant value-added services and to change the standards and methods of charges, such as the relevant uniforms.Company and/or partner units will be notified in due form that they may choose to accept or reject the service and that they will pay the fee in accordance with the company's and/or partner's fees when using the service. Otherwise, the company has the right not to provide the service to the user.</p>
              <p>
                1-11) User rights and obligations:
                <br />1-11-1) The ownership of the Bixiaobao account shall be vested in the company and the user shall obtain the right to use the Bixiaobao account after the application for registration. The right to use the Bixiaobao account shall only belong to the original registrant who shall not grant, lend, lease, assign or sell.The Company has the right to recall Bixiao users as a result of the relevant provisions of this Agreement.BAO account number.
                <br />1-11-2) The user shall bear full responsibility for the authenticity, legality and validity of the information registered on Bixiaobao.At the same time, users must not impersonate others or disseminate any information in the name of others; nor may malicious use of registered accounts cause other users to misidentify them; otherwise, the company has the right to immediately stop providing services and recover Bixiao.BAO account number and you are solely responsible for all the legal liabilities arising therefrom.
                <br />1-11-3) The user shall be solely responsible for the authenticity, legality, non-harmfulness and validity of the information transmitted and disseminated on Bixiaobao, and any legal responsibility related to the information transmitted or published by the user shall be borne by the user at his own discretion and not be associated with the company.
                <br />1-11-4) The user has the right to change and delete personal data, registration information, transmission and dissemination of information on Bixiaobao. However, note that while deleting the content, the user will also delete any text and pictures you have stored in the system. The user will be exposed to the risk.
                <br />1-11-5) To protect user account information security: It is the responsibility of the user to keep the registered account information, account password, and any activity that takes place including network transactions under this account; the user is liable for the registration account and the conduct of the password; and in the event of a non-authorized account or password login or any breach of the service clause.Users are required to notify the company immediately of any loss due to the use of their own account and password by other users of the company or Bixiaobao; in any case, users are not allowed to log in with any other account other than their own, otherwise the company has the right to freeze and review such accounts.
                <br />1-11-6) The user shall comply with the terms of this Agreement and use correctly and appropriately the products and/or services provided by Bixiaobao, and the company shall have the right to provide Bixiaobao products and/or services to the default user account in accordance with the agreement termination.At the same time, the company will retain it at all times.Bixiaobao account, user name rights.
                <br />1-11-7) If you do not log in to the account after a user has registered Bixiaobao account (more than 3 months from the date of registration), the company reserves the right to notify you to recall the account and clear your relevant registration information so as not to cause waste of resources and hence the problem is left to the user himself.
                <br />1-11-8) Users shall not make, upload, copy, transfer, and publish the following using the products and/or services provided by Bixiaobao or Bixiaobao:
                <br />a) against the basic principles set forth in the Constitution;
                <br />b) jeopardizing national security, disclosing state secrets, overturning state power and undermining national unity;
                <br />c) prejudice to the honor and interests of the state;
                <br />d) incite national hatred, discrimination and undermine national unity;
                <br />e) those who undermine the state's religious policy and propagate cults and feudal superstitions;
                <br />f) To spread rumors, disturb social order and undermine social stability;
                <br />g) To disseminate obscene, erotic, gambling, violence, murder, terror or abet crime;
                <br />h) insulting or defaming others or infringing on the lawful rights and interests of others;
                <br />i) Information containing other content prohibited by law and administrative regulations.
                <br />j) The Bixiaobao related service rules prohibit the production, upload, copy, transfer, and release of content.
                <br />1-11-9) Before using the products and/or services provided by Bixiaobao, the user agrees that there will be no such action, otherwise the user will be fully responsible for any damages caused by the violation of the above restrictions:
                <br />a) any illegal activities using products and/or services provided by Bixiaobao;
                <br />b) Try accessing any part of the service or any Bixiaobao server network using unauthorized means;
                <br />c) infringing on the rights of any individual or entity, including but not limited to its intellectual property, privacy, image or contractual rights;
                <br />d) Interference or damage to any part of the service, including but not limited to the use of viruses, zombie programs, Trojan horses, harmful codes, DDOS attacks, denial-of-service attacks, data packets or IP spoofing, routing or email address information or similar methods or techniques;
                <br />e) use scripts, robots, reptiles or other automated mechanisms to collect information or otherwise interact with services without the company's explicit written permission;
                <br />f) Any content that can be used for the purpose of selling Bixiaobao to others for profit without the written permission of the company, including not limited to any portion of the products and/or services provided by Bixiaobao in any form.or content.
                <br />1-11-10) Once you violate this Agreement or Bixiaobao related service rules, we have the right to cancel your account and delete all information you have posted on Bixiaobao.
                <br />1-11-11) After we cancel your account, we will not exclude the fact that we will retain the information you have posted on Bixiaobao.If you need to delete the information posted on Bixiaobao, you can contact us at any time through the contact in this Agreement, "7", for processing.
              </p>
              <h4>2. Disclaimer</h4>
              <p>2-1) User breach of this Agreement or Bixiaobao related service rules, any claim, claim or loss, including reasonable attorney fees, the user agrees to indemnify the company and the partner company, the associated company, and to protect it from damages.</p>
              <p>2-2) The company and its partners shall not be held responsible for all losses suffered by third parties such as telecommunication line failures, technical problems, networks, computer failures, system instability and other force majeure causes.</p>
              <p>2-3) The company and the cooperative units promise to cooperate with the relevant units in the first time for timely repair due to the normal operation of the service due to an event of force majeure such as technical failure. However, the company and the cooperative units shall not be held responsible for all losses incurred by the user.</p>
              <p>2-4) Users need to understand that using Bixiaobao's products and/or services may be affected by instability in various sectors due to the involvement of Internet services.Hence, Bixiaobao provides products and/or services due to Force Majeure, computer virus or hacking, system instability, user-friendly, and other factors.Risk of service interruption or failure to meet user requirements due to location, user shutdown, and any other technology, network connectivity, communication line reasons, etc.Users are required to take the above risks and the company is not guaranteed.The company is not held responsible for the fact that the user is unable to send and receive reading information or receive the wrong message.</p>
              <p>2-5) Users need to understand that there is a risk of anonymous or impersonal information including threatening, defamatory, offensive or illegal content or behavior from any other person, or infringement of other person's rights (including intellectual property) in the use of products and/or services provided by Bixiaobao. Users are exposed to the above risks.and the Partner shall not be liable for any direct, indirect, incidental, special and consequential damages whatsoever arising out of any product or service provided by Bixiaobao, whether explicitly or implied, including all implied warranties and conditions relating to the authenticity, appropriateness, fitness for a particular purpose, ownership and non-infringement of the information.</p>
              <p>2-6) Users need to understand that the company strives for accuracy, completeness and timeliness of the products and/or services provided by Bixiaobao, but does not guarantee their accuracy, completeness and timeliness.Losses, including but not limited to, any use of Bixiaobao's products and/or services content directly or indirectlyThe Company shall not be held liable for any loss due to inaccurate and incomplete contents of the Products and/or Services.Nor does the company guarantee the accuracy and completeness of the external links set.The company has no legal responsibility for obtaining other content from Bixiaobao through links to other websites.</p>
              <p>2-7) In any case, the company shall not be liable for any indirect, consequential, punitive, accidental, special or penal damages, including loss of profits due to users' use of products and/or services provided by Bixiaobao (even if the company has been informed of the possibility of such losses).All the responsibilities of the company to you.Responsibility, for whatever reason or manner of conduct, will be held within the limits prescribed by law.</p>
              <p>2-8) The Company shall not be held liable for any of the following related matters:</p>
              <p>
                a) The Company shall provide your personal letter in accordance with the law or the requirements of the relevant government.interest rate;
                <br />b) As you inform others of your user password or share a registered account with others,any leakage of personal information or other personal information not attributable to the companyleakage of information;
                <br />c) Any third party under the Bixiaobao Service Agreement and the CompanyThe circumstances set out in the statement use your personal information, resulting in a dispute;
                <br />d) Any attack by hackers, computer viruses, or government control;temporary closure of the website;
                <br />e) any consequence arising from force majeure;
                <br />f) The Company is listed in the Bixiaobao Service Agreement and the Company's Statement.use or exemption.
              </p>
              <p>2-9) Users should understand that Bixiaobao provides products and/or services.third party suppliers and partner advertising, the company will do its best to make reasonable efforts.Audits the advertiser and content of the advertisement, but the company cannot assure you of the authenticity, legitimacy and full compliance with your expectations of the ultimate service or product you receive or experience through the advertisement.to guarantee and guarantee.</p>
              <p>2-10) The company may need to use it because of its development strategy adjustmentsBixiaobao products or services are adjusted (including but not limited to changes,Stop, restrict, terminate or revoke your interest in Bixiaobao), we will notify you in advance if the adjustment may affect your interest, but we cannot guarantee that the adjustment will be minimal.It will not affect your interests in any way.</p>
              <p>2-11) The products and/or services provided by Bixiaobao may be provided by the Department of Health.provided by or in conjunction with third party partners, the Company is unable to provide the product and/oror the completeness, authenticity and full compliance with your expectations of the service (particularly the part provided independently by the third party); if you use the products and/or services provided through BixiaobaoThird-party products or services (especially those purchased by third-party products and/or services) Please be sure to read the product and/or service specifications and policies of third-party service providers carefully.make a rational judgment of one's own accord.</p>
              <p>2-12) For information posted by users on Bixiaobao, weA preliminary examination of the content of the information will be carried out before it is released.However, we cannot guarantee that there is no infringement of the legitimate rights and interests of a third person due to the fact that users publish more information. In addition, we will publish information to non-individual users.Post-inspection mechanisms are adopted.Therefore, if you find information posted by users on Bixiaobao infringing or breaking the law, please pass it immediately.The contacts in this Agreement, "7", contact us for processing, but we do not publish to usersAny consequence and liability arising from the informationThe user is responsible for all consequences and liabilities.</p>
              <p>2-13) The right owner thinks the information provided by Bixiaobao is emptyThe work involved in storing, searching, or linking the contents of a service has been infringed.If its right to disseminate information or is deleted or altered in its right to manage electronic information, it may submit a written notice to Bixiaobao in accordance with the law.Authenticity of the rightful person to the noticebe responsible for and assume all legal responsibilities arising from the inaccuracy of the notification.</p>
              <h4>3. Privacy Policy</h4>
              <p>Please consult our Bixiaobao Privacy Policy,ABO Privacy Policy as an Inalienable and Inalienable part of this Agreement.</p>
              <h4>4. Intellectual Property Protection</h4>
              <p>
                4-1) Intellectual Property Statement
                <br />a) Bixiaobao was developed by the company.Bixiaobao's intellectual property rights, such as copyright, trademark, patent, trade secrets, and all other intellectual property rights in Bixiaobao.All information related to the software, including but not limited to: text representation and its combination, icons, drawings, diagrams, colors, interface design, layout framework, relevant data, printed materials, or electricity"Subject to the Copyright Law, Trademark Law, Patent Law, Anti-unfair Competition Law and corresponding international treaties and other intellectual property laws and regulations of the People's Republic of China,"Protection, in addition to software or technology authorized by third parties, the company has the above intellectual property rights.
                <br />b) You are not allowed to make Bixiaobao products without written permission from the companyor the relevant intellectual property rights (including but not limited to trademarks, softwares,"patent) to reproduce, alter, modify, or otherwise create derivative works for any commercial purpose; you may use B reasonably for non-commercial purposes without prejudice to the company's reputation"The trademark of ixiaobao; any Bixiaobao product and/or service provided to you on the premise that the company is free or charged does not represent the company's intention to make the BiaBao brand.Xiaobao products and/or services have the intellectual property rights granted or transferred to you for use, company and/or related purposes.Unless you have another definite written agreement.
              </p>
              <p>
                4-2) Authorization Scope
                a) Users can install it on a single terminal device for non-commercial purposes.Use, display, and run Bixiaobao.Users are not allowed to settle for commercial purposes.Loading, using, and running Bixiaobao, do not release data into any computer terminal memory during operation of Bixiaobao or Bixiaobaoand Bixiaobao, the client-server interaction data is copied, altered, modified, hooked up or created in any derivative work.including, but not limited to, access to Bixiao using plug-ins, peripherals or unauthorized third-party tools/servicesBao and related systems.
                <br />b) The user shall not install Bixiaobao without the company's permissionon other terminal equipment that is not expressly licensed by the company.including, but not limited to, set-top boxes,Holding devices, telephones, wireless Internet access machines, game consoles, TV sets, DVD players, etc.
                <br />c) Reservation right: All other rights not expressly authorized shall remain in the company's possessionUsers are required to obtain additional written consent from the company when using other rights.
              </p>
              <h4>5. Agreement Integrity</h4>
              <p>When you use different products and/or services provided by Bixiaobao,The company may be developing according to the characteristics of different products and services Bixiaobao.A corresponding rule or notice or guideline that you should comply with when using the product or service, that rule or notice or guide a part of a cost agreement; public.The company attaches great importance to your privacy protection and has developed a special privacy policy which is an integral part of the cost agreement.</p>
              <h4>6. Dispute Resolution</h4>
              <p>
                6-1) This Agreement shall apply to the laws of the People's Republic of China.
                <br />6-2) You agree that you will contact the company promptly if there is any dispute arising out of this Agreement.Customer Service shall be agreed with the Company as soon as possible, if the two parties cannot agree within thirty days.You agree to file a suit with the people's court which has jurisdiction in the place of the company.
              </p>
              <h4>7. CONDITIONS</h4>
              <p>
                If you have any questions, comments or suggestions on the matter in connection with this Agreement, please contact us.Company.
                <br />Contact Mailbox: contact@bixiaobao.com;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      titleTemplate: this.$t("message.用户协议"),
      meta: [
        {
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          hid: "kewords",
          name: "keywords",
          content: this.$t("news.keywords")
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("news.description")
        }
      ]
    };
  },
  name: "agreement",
  data() {
    return {
      newsData: [],
      NextLink: [],
      LastLink: [],
      seoData: []
    };
  },
  created() {},
  components: {
    // 组件的引用
  },
  methods: {
    setLang(msg) {},
    loadData(id) {}
  },
  mounted() {
    // this.loadData(this.$route.params.id)
  }
};
</script>
<style lang="scss">
.agreement {
  width: 100%;
  min-height: 800px;
  .container {
    min-width:1200px;
      @media screen and (min-width:1200px){
        width: 1200px;
       }
       @media screen and (min-width:1440px){
        width: 1400px;
       }
    min-height: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    padding: 40px 50px;
    .breadcrumb {
      margin-bottom: 50px;
    }
    .cons {
      width: 90%;
      margin: 0 auto;
      h1 {
        text-align: center;
        font-size: 22px;
        font-weight: 500;
      }
      .infos {
        text-align: center;
        padding: 30px 0;
        margin-bottom: 50px;
        border-bottom: 1px solid #cccccc;
        color: #a1a6b4;
        span {
          color: #0386d9;
          margin-right: 20px;
        }
      }
      .datails {
        min-height: 500px;
      }
      .showCoon {
        h4 {
          margin-bottom: 5px;
        }
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>