/* Model Olympics: isolated presentation. No feed, signal, storage, or ranking calls. */
(function (global) {
  'use strict';
  const PROVIDERS = [['chatgpt','ChatGPT'],['claude','Claude'],['gemini','Gemini'],['grok','Grok'],['deepseek','DeepSeek'],['qwen','Qwen']];
  const ILLUSTRATIONS = {"jared-isaacman-station-bids-dec8":{"src":"/editorial-art/imagegen-v2/jared-isaacman-station-bids-dec8-1200.jpg","en":"A station needs customers as well as an orbit.","zh":"空间站不仅需要轨道，也需要客户。"},"anthropic-haiku-ten-cents-million":{"src":"/editorial-art/imagegen-v2/anthropic-haiku-ten-cents-million-1200.jpg","en":"Low input prices are only one part of the bill.","zh":"低输入价格，只是账单的一部分。"},"anne-carson-nobel-29-tangos":{"src":"/editorial-art/imagegen-v2/anne-carson-nobel-29-tangos-1200.jpg","en":"A book unfolding beyond its spine.","zh":"书卷展开，越过书脊的边界。"},"microsoft-agent-three-modes-boundary":{"src":"/editorial-art/imagegen-v2/microsoft-agent-three-modes-boundary-1200.jpg","en":"A boundary is only as strong as its operating mode.","zh":"边界能否生效，取决于运行模式。"},"navi-pillay-peace-law-2026":{"src":"/editorial-art/imagegen-v2/navi-pillay-peace-law-2026-1200.jpg","en":"Recognition and enforcement carry different weights.","zh":"荣誉与执行，分量各有不同。"},"jensen-huang-billion-science-five-years":{"src":"/editorial-art/imagegen-v2/jensen-huang-billion-science-five-years-1200.jpg","en":"A science pledge still has to reach the laboratory.","zh":"科学之诺，仍须抵达实验室。"},"sam-altman-math-three-withdrawals":{"src":"/editorial-art/imagegen-v2/sam-altman-math-three-withdrawals-1200.jpg","en":"The proof remains open to scrutiny.","zh":"证明仍须经受审视。"},"jared-isaacman-nuclear-space-2030":{"src":"/editorial-art/imagegen-v2/jared-isaacman-nuclear-space-2030-1200.jpg","en":"Powering the next journey beyond Earth.","zh":"为下一段天外征途供能。"},"jensen-satya-128gb-local-ai":{"src":"/editorial-art/imagegen-v2/jensen-satya-128gb-local-ai-1200.jpg","en":"The computing boundary moves closer to home.","zh":"计算的边界，移近本地。"},"kagan-soai-molecular-mirror-nobel":{"src":"/editorial-art/imagegen-v2/kagan-soai-molecular-mirror-nobel-1200.jpg","en":"Molecules can share a formula and face opposite ways.","zh":"分子同式，朝向却可相反。"},"david-ellison-warner-81-billion-close":{"src":"/editorial-art/imagegen-v2/david-ellison-warner-81-billion-close-1200.jpg","en":"The studio changes hands; the stories remain.","zh":"片厂易手，故事仍在。"},"francis-halzen-cubic-kilometre-nobel":{"src":"/editorial-art/imagegen-v2/francis-halzen-cubic-kilometre-nobel-1200.jpg","en":"Listening for particles beneath the ice.","zh":"于冰下，守候粒子的讯息。"},"chatgpt-12-billion-visual-ad-test":{"src":"/editorial-art/imagegen-v2/chatgpt-12-billion-visual-ad-test-1200.jpg","en":"Attention meets the advertising ledger.","zh":"注意力，与广告账簿相遇。"},"deisseroth-nobel-light-switch-neurons":{"src":"/editorial-art/imagegen-v2/deisseroth-nobel-light-switch-neurons-1200.jpg","en":"Light becomes a tool for studying neural activity.","zh":"光，成为探索神经活动的工具。"},"max-verstappen-first-win-october":{"src":"/editorial-art/imagegen-v2/max-verstappen-first-win-october-1200.jpg","en":"The finish line changes the season’s story.","zh":"终点线，改写赛季叙事。"},"lula-flavio-bolsonaro-runoff-oct25":{"src":"/editorial-art/imagegen-v2/lula-flavio-bolsonaro-runoff-oct25-1200.jpg","en":"A second vote leaves the outcome open.","zh":"第二轮投票，胜负尚未定。"},"mark-zuckerberg-cj-desai-322-days":{"src":"/editorial-art/imagegen-v2/mark-zuckerberg-cj-desai-322-days-1200.jpg","en":"A leadership move puts enterprise AI in view.","zh":"一次人事转向，让企业 AI 走入视野。"},"novak-djokovic-zverev-55-minutes":{"src":"/editorial-art/imagegen-v2/novak-djokovic-zverev-55-minutes-1200.jpg","en":"One match ends; the next test waits.","zh":"一战已毕，下一关仍在。"},"elon-musk-tesla-486532":{"src":"/editorial-art/imagegen-v2/elon-musk-tesla-486532-1200.jpg","en":"Deliveries and earnings tell different stories.","zh":"交付与盈利，诉说不同的故事。"},"taylor-swift-three-uk-number-ones":{"src":"/editorial-art/imagegen-v2/taylor-swift-three-uk-number-ones-1200.jpg","en":"New chart positions, returning songs.","zh":"新榜位，旧歌再来。"},"ken-griffin-cmu-3-billion":{"src":"/editorial-art/imagegen-v2/ken-griffin-cmu-3-billion-1200.jpg","en":"A university promise awaits its physical future.","zh":"学府之诺，等待落成的未来。"},"ranveer-singh-meta-glasses-44300":{"src":"/editorial-art/imagegen-v2/ranveer-singh-meta-glasses-44300-1200.jpg","en":"A familiar face frames a new device.","zh":"熟悉的面孔，映衬新的装置。"},"masayoshi-son-digitalbridge-31-billion":{"src":"/editorial-art/imagegen-v2/masayoshi-son-digitalbridge-31-billion-1200.jpg","en":"Digital ambition rests on physical infrastructure.","zh":"数字雄心，立于实体基础之上。"},"trump-ai-si-60-days":{"src":"/editorial-art/imagegen-v2/trump-ai-si-60-days-1200.jpg","en":"A new name on the paperwork is not a new capability.","zh":"文书易名，不等于能力已变。"},"lisa-su-fei-fei-82-billion":{"src":"/editorial-art/imagegen-v2/lisa-su-fei-fei-82-billion-1200.jpg","en":"Computing reaches toward spatial intelligence.","zh":"计算，走向空间智能。"},"starliner-61-fixes-2028":{"src":"/editorial-art/imagegen-v2/starliner-61-fixes-2028-1200.jpg","en":"The next flight must earn trust again.","zh":"下一次飞行，仍须重新赢得信任。"},"eviltokens-real-login-trap":{"src":"/editorial-art/imagegen-v2/eviltokens-real-login-trap-1200.jpg","en":"A real doorway can admit the wrong visitor.","zh":"真实的门，也可能放进错误的访客。"},"mars-rocks-three-water-stories":{"src":"/editorial-art/imagegen-v2/mars-rocks-three-water-stories-1200.jpg","en":"Stone keeps traces of an older water story.","zh":"岩石，保存更古老的水之故事。"},"ff-robots-american-dream":{"src":"/editorial-art/imagegen-v2/ff-robots-american-dream-1200.jpg","en":"A delivery promise meets a balance-sheet question.","zh":"交付之诺，遇上资产负债表之问。"},"roman-cosmic-blind-spot":{"src":"/editorial-art/imagegen-v2/roman-cosmic-blind-spot-1200.jpg","en":"A wider field opens another view of the sky.","zh":"更广的视野，打开另一片天空。"},"anthropic-paid-watchdog":{"src":"/editorial-art/imagegen-v2/anthropic-paid-watchdog-1200.jpg","en":"Who pays for the scrutiny?","zh":"谁为审视付账？"},"hotel-wifi-spy-trap":{"src":"/editorial-art/imagegen-v2/hotel-wifi-spy-trap-1200.jpg","en":"A familiar connection can hide an unfamiliar observer.","zh":"熟悉的连接，可能藏着陌生的旁观者。"},"meta-muse-wonder-14-months":{"src":"/editorial-art/imagegen-v2/meta-muse-wonder-14-months-1200.jpg","en":"Useful memory meets the boundary of consent.","zh":"有用的记忆，遇上授权的边界。"},"scott-guthrie-maia-96-167kw":{"src":"/editorial-art/imagegen-v2/scott-guthrie-maia-96-167kw-1200.jpg","en":"AI throughput still needs physical power.","zh":"AI吞吐，仍须实体电力。"},"anthropic-scion-30000-merges":{"src":"/editorial-art/imagegen-v2/anthropic-scion-30000-merges-1200.jpg","en":"A code flood needs new machinery to receive it.","zh":"代码洪流，需要新的承接之器。"},"griffin-153-decibels-moon":{"src":"/editorial-art/imagegen-v2/griffin-153-decibels-moon-1200.jpg","en":"The ground rehearsal comes before the lunar journey.","zh":"地面试炼，在月球旅途之前。"},"perseverance-4522km-autonav":{"src":"/editorial-art/imagegen-v2/perseverance-4522km-autonav-1200.jpg","en":"More reach; humans still choose the destination.","zh":"行得更远，目的地仍由人定。"},"microsoft-billion-scams-suppliers":{"src":"/editorial-art/imagegen-v2/microsoft-billion-scams-suppliers-1200.jpg","en":"The supply machinery behind the messages.","zh":"消息背后，供给之器。"},"greenland-lake-b-hidden-reservoir":{"src":"/editorial-art/imagegen-v2/greenland-lake-b-hidden-reservoir-1200.jpg","en":"An imagined cutaway, not a photograph of Lake B.","zh":"想象剖面，并非B湖实景照片。"},"tsmc-4672-billion-two-nanometres":{"src":"/editorial-art/imagegen-v2/tsmc-4672-billion-two-nanometres-1200.jpg","en":"A conceptual cleanroom; the next ramp remains to be delivered.","zh":"概念洁净室；下一段爬坡，仍待兑现。"}};
  function editorialArt(id,t,cls="op-editorial-art") {
    const art=ILLUSTRATIONS[id]; if(!art)return "";
    return '<figure class="'+cls+'" data-op-editorial-art><img src="'+art.src+'" srcset="'+art.src.replace('-1200.jpg','-600.jpg')+' 600w, '+art.src+' 1200w" sizes="'+(cls.includes('op-art')?'(max-width:700px) 100vw, 50vw':cls==='op-editorial-art'?'(max-width:700px) 100vw, 840px':'150px')+'" alt="'+esc(t(art.en,art.zh))+'" width="1200" height="800" loading="lazy" decoding="async"><figcaption>'+esc(t(art.en,art.zh))+' <span>'+t("IMAGEGEN · imagined editorial scene, not a news photograph","IMAGEGEN · 编辑概念场景，非新闻照片")+'</span></figcaption></figure>';
  }
  const ART = {'eviltokens-real-login-trap':'eviltokens','mars-rocks-three-water-stories':'mars','ff-robots-american-dream':'robot','roman-cosmic-blind-spot':'galaxy','anthropic-paid-watchdog':'oversight','hotel-wifi-spy-trap':'security'};
  const LABELS = {'eviltokens-real-login-trap':['EvilTokens','真登录陷阱'],'mars-rocks-three-water-stories':['Mars & water','火星与水'],'ff-robots-american-dream':['FF robots','FF机器人'],'roman-cosmic-blind-spot':['Roman telescope','罗曼望远镜'],'anthropic-paid-watchdog':['AI oversight','AI监督'],'hotel-wifi-spy-trap':['Hotel Wi-Fi','酒店Wi-Fi']};
  let cache = null, pending = null, generation = 0, unbind = () => {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function safeURL(value) {
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; } catch { return null; }
  }
  // Defense in depth for source media; original article Markdown stays untouched.
function mediaSourceURL(value){
 if(typeof value!=='string'||value.length>2048||!/^https:\/\//i.test(value)||/[\s\\\u0000-\u001f\u007f]/.test(value))return null;
 try{
  const url=new URL(value),host=url.hostname.toLowerCase().replace(/\.+$/,'');
  if(url.protocol!=='https:'||url.username||url.password||url.port||!host.includes('.')||!/[a-z]/.test(host)||!/^[a-z0-9.-]+$/.test(host)||/(?:^|\.)(?:localhost|local|internal|lan|home|test|invalid|example|onion)$/.test(host))return null;
  let decoded=value;
  for(let i=0;i<3;i++){const next=decodeURIComponent(decoded);if(next===decoded)break;decoded=next;}
  if(/(?:gh[pousr]_[a-z0-9]{20,}|github_pat_[a-z0-9_]{20,}|sk-[a-z0-9_-]{20,}|xox[baprs]-[a-z0-9-]{10,}|eyJ[a-z0-9_-]{16,}\.[a-z0-9_-]{16,}\.[a-z0-9_-]{16,})/i.test(decoded))return null;
  const inspect=new URL(decoded);
  if(inspect.username||inspect.password)return null;
  for(let key of [...url.searchParams.keys(),...new URLSearchParams(url.hash.slice(1)).keys(),...inspect.searchParams.keys(),...new URLSearchParams(inspect.hash.slice(1)).keys()]){for(let i=0;i<3;i++){const next=decodeURIComponent(key);if(next===key)break;key=next;}if(/(?:token|secret|password|passwd|credential|signature|session|api.?key|access.?key|authorization|authuser)|^(?:key|auth|code|jwt|sig)$/i.test(key))return null;}
  if(/(?:^|\.)(?:chatgpt\.com|chat\.openai\.com|claude\.ai|gemini\.google\.com|grok\.com|chat\.deepseek\.com|chat\.qwen\.ai|chat\.qwenlm\.ai|accounts\.google\.com|accounts\.x\.ai|mail\.google\.com|drive\.google\.com|docs\.google\.com)$/.test(host))return null;
  if(host==='x.com'&&/^\/i\/grok\//i.test(inspect.pathname))return null;
  return url.href;
 }catch{return null;}
}
  function editionMedia(data, topic, provider, language) {
    const editions = data.media?.schema_version === 1 && Array.isArray(data.media.editions) ? data.media.editions : [];
    const matches = editions.filter(row => row?.topic === topic && row.provider === provider && row.language === language);
    if (matches.length !== 1 || !Array.isArray(matches[0].items) || matches[0].items.length > 64) return [];
    return matches[0].items.filter(item => item && ['image','video'].includes(item.kind) && item.origin === 'source' && typeof item.title === 'string' && item.title.trim() && item.title.length <= 500 && typeof item.credit === 'string' && item.credit.length <= 500 && (item.availability_note === null || typeof item.availability_note === 'string' && item.availability_note.length <= 1000) && mediaSourceURL(item.source_url) && (item.asset_path === null || typeof item.asset_path === 'string' && (item.kind === 'image' ? /^\/edition-media\/[a-z0-9-]+\.(jpg|png|webp)$/ : /^\/edition-media\/[a-z0-9-]+\.mp4$/).test(item.asset_path)));
  }
  function mediaGallery(items, t, id) {
    if (!items.length) return '';
    const sourceLink = (item, label, cls = '') => '<a class="' + cls + '" href="' + esc(mediaSourceURL(item.source_url)) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    return '<section class="op-media" data-op-media-gallery id="' + esc(id) + '" aria-label="' + t('Source media','来源媒体') + '"><h2>' + t('Source media','来源媒体') + '</h2><p class="op-media-note">' + t('Media from this response, preserved separately from the original text.','该回答中的来源媒体，单独保留，原文不变。') + '</p><div class="op-media-grid">' + items.map(item => '<figure class="op-media-item">' + (item.asset_path ? item.kind === 'image' ? sourceLink(item,'<img src="' + esc(item.asset_path) + '" alt="' + esc(item.title) + '" loading="lazy" decoding="async">','op-media-visual') : '<video src="' + esc(item.asset_path) + '" controls preload="none" playsinline aria-label="' + esc(item.title) + '"></video>' : sourceLink(item,t(item.kind === 'video' ? 'Video at source ↗' : 'Image at source ↗',item.kind === 'video' ? '查看来源视频 ↗' : '查看来源图片 ↗'),'op-media-source-card')) + '<figcaption><p class="op-media-title">' + esc(item.title) + '</p>' + (item.credit ? '<p class="op-media-credit">' + t('Credit: ','来源署名：') + esc(item.credit) + '</p>' : '') + (item.availability_note ? '<p class="op-media-note">' + esc(item.availability_note) + '</p>' : '') + sourceLink(item,t('View source ↗','查看来源 ↗'),'op-media-source') + '</figcaption></figure>').join('') + '</div></section>';
  }
  function inline(value, depth = 0) {
    if (depth > 4) return esc(value);
    const pattern = /(`[^`\n]+`|!?\[[^\]\n]*\]\([^\s)]+\)|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_)/g;
    let output = '', offset = 0;
    for (const match of String(value).matchAll(pattern)) {
      output += esc(String(value).slice(offset, match.index));
      const token = match[0];
      if (token[0] === '`') output += '<code>' + esc(token.slice(1,-1)) + '</code>';
      else if (token[0] === '[' || token.startsWith('![')) {
        const parts = /^!?\[([^\]]*)\]\(([^)]+)\)$/.exec(token), url = safeURL(parts[2]);
        output += token[0] === '!' || !url ? esc(parts[1]) : '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + inline(parts[1], depth + 1) + '</a>';
      } else if (token.startsWith('**') || token.startsWith('__')) output += '<strong>' + inline(token.slice(2,-2), depth + 1) + '</strong>';
      else output += '<em>' + inline(token.slice(1,-1), depth + 1) + '</em>';
      offset = match.index + token.length;
    }
    return output + esc(String(value).slice(offset));
  }
  function markdown(raw, lineParagraphs = false) {
    const lines = String(raw ?? '').replace(/\r\n?/g,'\n').split('\n');
    const out = []; let paragraph = [], quote = [], list = [], listType = '', code = null;
    const flush = () => {
      if (paragraph.length) { out.push('<p>' + paragraph.map(line => inline(line)).join('<br>') + '</p>'); paragraph = []; }
      if (quote.length) { out.push('<blockquote>' + quote.map(line => inline(line)).join('<br>') + '</blockquote>'); quote = []; }
      if (list.length) { out.push('<' + listType + '>' + list.join('') + '</' + listType + '>'); list = []; listType = ''; }
    };
    for (const line of lines) {
      if (/^\s*```/.test(line)) { if (code !== null) { out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>'); code = null; } else { flush(); code = []; } continue; }
      if (code !== null) { code.push(line); continue; }
      if (!line.trim()) { flush(); continue; }
      const heading = /^(#{1,6})\s+(.+)$/.exec(line);
      if (heading) { flush(); const level = Math.max(2, heading[1].length); out.push('<h' + level + '>' + inline(heading[2]) + '</h' + level + '>'); continue; }
      if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { flush(); out.push('<hr>'); continue; }
      const item = /^\s*(?:(\d+)[.)]|([-+*]))\s+(.+)$/.exec(line);
      if (item) { const type = item[1] ? 'ol' : 'ul'; if (paragraph.length || quote.length || (listType && listType !== type)) flush(); listType = type; list.push('<li' + (item[1] ? ' value="' + Number(item[1]) + '"' : '') + '>' + inline(item[3]) + '</li>'); continue; }
      if (/^>\s?/.test(line)) { if (paragraph.length || list.length) flush(); quote.push(line.replace(/^>\s?/,'')); continue; }
      if (quote.length || list.length) flush(); paragraph.push(line); if (lineParagraphs) flush();
    }
    flush(); if (code !== null) out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
    return out.join('\n');
  }
  function displayText(raw) {
    // Strip only leading, exactly recognized capture UI; never rewrite original files.
    return String(raw).replace(/^:chatgpt-content-reference\{index="\d+"\}\[[^\]\n]+\]\(sandbox:\/[^\n]+\)\s*\n/,'').replace(/^(?:\s*(?:(?:Gemini|Claude|ChatGPT) said|Writing|Worked for \d+(?:\.\d+)?s)\s*\n)+/i,'');
  }
  function displayMarkdown(raw) {
    const text = displayText(raw);
    return markdown(text, !/\n[ \t]*\n/.test(text.trim()));
  }
  function selectedMarkdown(raw) {
    const text=displayText(raw),headlines=preview(text).headlines,lines=text.split('\n');
    const end=lines.slice(0,80).findLastIndex(line=>headlines.length===3&&plain(line).includes(headlines[2]));
    if(end<0)return displayMarkdown(raw);
    return '<details class="op-original-options"><summary>Original headline options / 原始标题选项</summary>'+displayMarkdown(lines.slice(0,end+1).join('\n'))+'</details>'+displayMarkdown(lines.slice(end+1).join('\n'));
  }
  function storyExcerpt(raw) {
    const text=displayText(raw),headlines=preview(text).headlines,lines=text.split('\n');
    const end=lines.slice(0,80).findLastIndex(line=>headlines.length===3&&plain(line).includes(headlines[2]));
    const blocks=lines.slice(end+1).join('\n').split(/\n\s*\n/).map(block=>block.split('\n').filter(line=>!/^\s*(?:#{1,6}\s|---)/.test(line)).map(plain).join(' ').trim()).filter(block=>block&&(/[.!?。？！]$/.test(block)||block.length>=120));
    let paragraph=blocks[0]||preview(raw).teaser;
    for(let i=1;paragraph.length<70&&i<blocks.length;i++)paragraph+=' '+blocks[i];
    const excerpt=paragraph.slice(0,180);return paragraph.length>180?(/[\u3400-\u9fff]/.test(excerpt)?excerpt:excerpt.replace(/\s+\S*$/,''))+'…':paragraph;
  }
  function contextPanel(data, entry, t) {
    const item=data.context?.editions?.find(row=>row.article_path===entry?.article_path);
    if(!item)return '<aside class="op-notice">'+t('Generation conditions and fact-check coverage: UNKNOWN.','生成条件及核查覆盖：UNKNOWN。')+'</aside>';
    const prompt=item.prompt_version==='v1-labeled-fiction'?t('Prompt v1: labeled fictional scenes allowed.','提示词 v1：允许明确标示的虚构场景。'):t('Prompt v2: invented scenes and quotations prohibited.','提示词 v2：禁止虚构场景及引语。');
    const review=item.fact_check_status==='SOURCE_REVIEW_RECORDED'?t('Source comparison recorded; this is not independent verification of every claim. See separate corrections where present.','已记录来源对照；不代表每项断言均获独立核实。如有纠错，另列说明。'):t('Fact-check coverage UNKNOWN: no complete review record established. No correction does not mean verified.','核查覆盖 UNKNOWN：尚未确认完整核查记录。没有纠错不代表核实通过。');
    return '<aside class="op-notice" data-op-context><strong>'+t('Edition context','版本背景')+'</strong><p>'+esc(prompt)+'</p><p>'+t('Captured: ','采集时间：')+esc(item.captured_at)+t(' (capture time, not generation time).','（采集时间，不等于生成时间）。')+'</p>'+(item.input_deviation?'<p>'+t('Input exception: the Claude Starliner brief was interleaved/duplicated during submission. Identical prompt delivery is not claimed.','输入异常：Claude Starliner 简报提交时发生交错及重复，不宣称提示词完全一致。')+'</p>':'')+'<p>'+esc(review)+'</p></aside>';
  }
  const plain = line => line.replace(/^\s*(?:#{1,6}\s*|\d+[.)]\s*|[-+]\s*)/,'').replace(/\*\*|__|`/g,'').replace(/^\*|\*$/g,'').trim();
  function preview(raw) {
    const lines = String(raw).replace(/\r\n?/g,'\n').split('\n');
    const headlines = []; let last = -1;
    for (let i = 0; i < Math.min(lines.length,80) && headlines.length < 3; i++) {
      const line = plain(lines[i]);
      const style = /suspens|emotion|counter[ -]*intuitive|悬|懸|情感|情怀|情深|情动|情韵|动情|寄情|共鸣|共情|抒情|浪漫|反思|反直[觉覺]|逆直[觉覺]|反常识|反常|反转|逆思|逆向思维|反向直觉|反差|出人意料|磅礴史诗/i;
      // An introductory sentence about romantic prose is not a headline option.
      if (/^(?:以下|这里|为您|这是|Here\b|Below\b)/i.test(line)) continue;
      // Explicitly numbered Chinese options can omit a style label entirely.
      const numbered = /^标题[一二三123][｜|]\s*(.+)$/.exec(line);
      if (i < 8 && numbered && !style.test(numbered[1].split(/[:：]/)[0])) { headlines.push(numbered[1]); last = i; continue; }
      const bracket = /^(?:[一二三][、.．]\s*)?【([^】]+)】\s*(.+)$/.exec(line);
      // A bar after the style is a separator; a bar before it is label decoration.
      const bar = line.search(/[｜|]/);
      const separator = bar >= 0 && style.test(line.slice(0,bar)) ? bar : line.search(/[:：]/);
      let headline = '', end = i;
      if (bracket && style.test(bracket[1])) headline = bracket[2];
      else {
        if (separator < 0 || separator > 55) continue;
        const label = line.slice(0,separator);
        if (!style.test(label) || /[，。；!?！？]/.test(label) || /标题选项|标题选择|风格成稿/.test(label)) continue;
        headline = line.slice(separator + 1).trim();
        if (!headline) { end = i + 1; while (end < lines.length && !lines[end].trim()) end++; headline = plain(lines[end] || ''); }
      }
      headline = headline.replace(/^\*+|\*+$/g,'').trim();
      if (headline) { headlines.push(headline); last = end; i = end; }
    }
    // Some originals explicitly group three unlabelled options under this heading.
    if (!headlines.length) {
      const opening=lines.slice(0,8).map(plain).filter(Boolean).slice(0,3);
      if(opening.length===3&&opening.every(line=>/^【[^】]{5,240}】$/.test(line))){
        headlines.push(...opening.map(line=>line.slice(1,-1)));
        last=lines.findIndex(line=>plain(line)===opening[2]);
      }
      const start=lines.findIndex(line=>/^Three Headline Options$/i.test(plain(line)));
      if(!headlines.length&&start>=0&&start<8){
        const options=lines.slice(start+1).map(plain).filter(Boolean).slice(0,3);
        if(options.length===3&&options.every(line=>line.length>=15&&line.length<=240)){
          headlines.push(...options);last=start;
          for(const option of options){last=lines.findIndex((line,index)=>index>last&&plain(line)===option);}
        }
      }
    }
    const blocks = lines.slice(last + 1).join('\n').split(/\n\s*\n/);
    const paragraph = blocks.map(block => block.split('\n').filter(line => !/^\s*(?:#{1,6}\s|---|Writing\s*$|Worked for |(?:Gemini|Claude|ChatGPT) said\s*$)/i.test(line)).map(plain).join(' ').trim()).find(block => block.length >= 55) || '';
    const excerpt = paragraph.slice(0,180);
    return {headlines, teaser: paragraph.length > 180 ? (/[\u3400-\u9fff]/.test(excerpt) ? excerpt : excerpt.replace(/\s+\S*$/,'')) + '…' : paragraph};
  }
  async function load() {
    if (cache) return cache;
    if (!pending) pending = fetch('/api/olympics', {credentials:'same-origin'}).then(async response => {
      if (!response.ok) throw new Error('Unavailable'); const data = await response.json();
      if (!Array.isArray(data?.catalog?.articles) || !data.articles || !data.briefs) throw new Error('Invalid archive');
      cache = data; return data;
    }).finally(() => { pending = null; });
    return pending;
  }
  function dispose() { generation++; unbind(); unbind = () => {}; }
  function parseRoute(hash) {
    const parts = String(hash || 'olympics').replace(/^#/,'').split('/');
    try { return {view:parts[0], topic:decodeURIComponent(parts[1] || ''), provider:decodeURIComponent(parts[2] || '')}; }
    catch { return {view:'invalid',topic:'',provider:''}; }
  }
  async function render({main, lang = 'en', stories = [], hash = 'olympics', onNavigate, data: supplied}) {
    if (!main) throw new Error('Olympics requires a main element');
    dispose(); const token = generation, language = lang === 'zh' ? 'zh' : 'en';
    const t = (en,zh) => language === 'zh' ? zh : en;
    const localized = value => typeof value === 'string' ? value : value?.[language] || value?.en || '';
    main.classList.add('olympics-host');
    unbind = () => { main.classList.remove('olympics-host'); };
    main.innerHTML = '<section class="olympics op-loading" role="status">' + t('Opening the editors’ salon…','正在打开编辑沙龙……') + '</section>';
    let data;
    try { data = supplied || await load(); }
    catch {
      if (token !== generation) return () => {};
      main.innerHTML = '<section class="olympics op-empty"><h1>' + t('The editions could not load.','版本暂时无法载入。') + '</h1><p>' + t('The archive is temporarily unavailable.','档案暂时无法读取。') + '</p><button type="button" data-op-retry>' + t('Try again','重试') + '</button></section>';
      const retry = () => render({main,lang,stories,hash,onNavigate}); main.querySelector('[data-op-retry]').addEventListener('click', retry);
      unbind = () => { main.classList.remove('olympics-host'); };
      return dispose;
    }
    if (token !== generation) return () => {};
    const rows = data.catalog?.articles || [], route = parseRoute(hash);
    const pickFor = id => data.picks?.entries?.find(pick=>pick.topic===id&&pick.language===language);
    const displayTitle = item => pickFor(item?.id)?.headline || localized(item?.title) || item?.headline || item?.id || '';
    // New batches own their display metadata; sealed legacy story packets are unchanged.
    const topics = Array.isArray(data.topics) && data.topics.length ? data.topics.map(topic => ({...stories.find(story => story.id === topic.id),...topic})) : stories.filter(story => rows.some(row => row.topic === story.id));
    const dates = [...new Set(topics.map(topic => topic.archive_date).filter(date => /^\d{4}-\d{2}-\d{2}$/.test(date || '')))].sort().reverse();
    const dateRoute = route.view === 'olympics' && /^\d{4}-\d{2}-\d{2}$/.test(route.topic) ? route.topic : null;
    const archiveView = route.view === 'olympics' && route.topic === 'archive';
    const requestedStory = topics.find(item => item.id === route.topic);
    const selectedDate = dateRoute || requestedStory?.archive_date || dates[0];
    const datedTopics = selectedDate ? topics.filter(item => item.archive_date === selectedDate) : topics;
    const story = requestedStory || ((!route.topic || dateRoute) ? datedTopics[0] : null);
    const link = (target, label, cls = '') => '<a class="' + cls + '" data-op-route="' + esc(target) + '" href="#' + esc(target) + '">' + label + '</a>';
    const slot = provider => {
      const matches = rows.filter(row => row.topic === story?.id && row.provider === provider && row.language === language);
      const entry = matches.length === 1 ? matches[0] : null;
      const expected = 'articles/' + story?.id + '/' + provider + '/' + (language === 'en' ? 'english' : 'chinese') + '.md';
      const raw = entry?.status === 'available' && entry.article_path === expected && Object.hasOwn(data.articles,expected) && typeof data.articles[expected] === 'string' ? data.articles[expected] : null;
      return {entry,raw,media:raw === null ? [] : editionMedia(data,story.id,provider,language)};
    };
    const title = pickFor(story?.id)?.headline || (story?.id === 'eviltokens-real-login-trap' ? t('The login page was real. That was the trap.','登录页是真的。陷阱也是真的。') : localized(story?.title) || story?.headline || '');
    const archiveNav = dates.length ? '<nav class="op-dates" aria-label="' + t('Dated archive','日期档案') + '">' + link('olympics/archive',t('All dates','全部日期'),'op-date-link' + (archiveView ? ' is-active' : '')) + dates.map(date => link('olympics/' + date,esc(date),'op-date-link' + (!archiveView && date === selectedDate ? ' is-active' : ''))).join('') + '</nav>' : '';
    const storyNav = archiveNav + '<nav class="op-topics" aria-label="' + t('Choose a story','选择故事') + '">' + datedTopics.map(item => link('olympics/' + encodeURIComponent(item.id),esc(pickFor(item.id) ? displayTitle(item) : LABELS[item.id]?.[language === 'zh' ? 1 : 0] || localized(item.title)), 'op-topic' + (item.id === story?.id ? ' is-active' : ''))).join('') + '</nav>';
    const providerNav = '<nav class="op-providers" aria-label="' + t('Choose an edition','选择模型版本') + '">' + PROVIDERS.map(([id,name]) => link('edition/' + story?.id + '/' + id,esc(name),'op-provider-link' + ((route.provider || (route.view==='story'?pickFor(story?.id)?.provider:null)) === id ? ' is-active' : ''))).join('') + '</nav>';
    const notice = '<p class="op-notice">' + t('Original model drafts. Not independently fact-checked. Source briefs are separate.','模型原稿，尚未经独立事实核查。事实资料另列。') + '</p>';
    const eventDate = story?.event_date || rows.find(row => row.topic === story?.id)?.event_date;
    const dateText = /^\d{4}-\d{2}-\d{2}$/.test(eventDate || '') ? new Date(eventDate + 'T00:00:00Z').toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-GB',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}) : t('Date unknown','日期未知');
    const briefPath = 'briefs/' + story?.id + '.md';
    let rawDownload = null, downloadName = '';
    if (route.view === 'stories') {
      const groups=dates.map(date=>'<section class="op-archive-day"><h2>'+esc(date)+'</h2><div class="op-selected-grid">'+topics.filter(item=>item.archive_date===date).map(item=>{
        const pick=pickFor(item.id),provider=PROVIDERS.find(([id])=>id===pick?.provider),raw=pick?data.articles[pick.article_path]:null;
        return '<article class="op-selected-story" data-op-story="'+esc(item.id)+'">'+editorialArt(item.id,t,'op-editorial-art op-editorial-thumb')+'<div><p class="op-kicker">'+t('MAXWELL’S PICK','MAXWELL 选稿')+' · '+esc(provider?.[1]||t('Unselected','未选稿'))+'</p><h3>'+link('story/'+item.id,esc(displayTitle(item)))+'</h3><p>'+esc(raw?storyExcerpt(raw):localized(item.summary))+'</p><p class="op-date">'+esc(item.event_date)+' · '+t('Original event / report','原事件／报道日期')+'</p>'+link('story/'+item.id,t('Read the story →','阅读故事 →'),'op-read')+' '+link('olympics/'+item.id,t('All six voices','六家原稿'),'op-brief-link')+'</div></article>';
      }).join('')+'</div></section>').join('');
      main.innerHTML='<section class="olympics op-stories"><header class="op-reader-head"><p class="op-kicker">'+t('THE STORIES · '+topics.length+' TOPICS','故事 · '+topics.length+' 个主题')+'</p><h1>'+t('The story inside the news.','新闻里，藏着故事。')+'</h1><p>'+t('One English and one Chinese edition per topic, selected for attention, clarity and narrative. Each keeps its editor’s voice.','每题各选一篇英文与中文，以吸引力、清晰度及叙事为准，保留编辑原声。')+'</p></header>'+groups+'</section>';
    } else if (archiveView) {
      const groups = dates.map(date => '<section class="op-archive-day"><h2>' + link('olympics/' + date,esc(date)) + '</h2><ul>' + topics.filter(item => item.archive_date === date).map(item => '<li>' + link('olympics/' + item.id,esc(displayTitle(item))) + '<p>' + esc(localized(item.summary)) + '</p></li>').join('') + '</ul></section>').join('');
      main.innerHTML = '<section class="olympics">' + archiveNav + '<header class="op-reader-head"><p class="op-kicker">' + t('MODEL OLYMPICS · PERMANENT ARCHIVE','模型奥林匹克 · 永久档案') + '</p><h1>' + t('Every story. Every voice.','每个故事，每种声音。') + '</h1><p>' + t('Browse by collection date. Original event dates remain on each story.','按收录日期浏览；各故事另列原事件日期。') + '</p></header>' + groups + '</section>';
    } else if (!story) {
      main.innerHTML = '<section class="olympics op-empty"><h1>' + t('Story unavailable','故事暂不可用') + '</h1>' + link('olympics',t('Back to the salon','返回沙龙')) + '</section>';
    } else if (route.view === 'edition' || route.view === 'story') {
      const selectedPick=route.view==='story'?pickFor(story.id):null;
      const provider = PROVIDERS.find(([id]) => id === (selectedPick?.provider || route.provider)), current = provider ? slot(provider[0]) : {raw:null,entry:null};
      const supplements=(data.supplements||[]).filter(item=>item.topic===story.id&&item.provider===provider?.[0]&&item.language===language);
      const alternatives=supplements.map(item=>'<details class="op-prose"><summary>'+t('Additional original from Qwen','Qwen 的另一份原稿')+'</summary><p class="op-notice">'+t('Qwen offered two alternatives. Both are preserved; no preference was submitted. The main edition follows the response displayed by Qwen when the conversation continued. Individual backend identities were not disclosed.','Qwen 同时提供了两份稿件，均已保留，未提交偏好投票。主版本沿用继续对话时 Qwen 默认显示的稿件；每份稿件的底层模型身份未披露。')+'</p><a href="/api/olympics/original?path='+encodeURIComponent(item.article_path)+'" download>'+t('Download additional original','下载另一份原稿')+'</a>'+displayMarkdown(item.text)+'</details>').join('');
      const galleryID = 'op-media-' + story.id + '-' + (provider?.[0] || 'unknown') + '-' + language;
      const editionNote = current.entry?.availability_note ? '<aside class="op-notice" data-op-edition-note><strong>' + t(current.raw ? 'Source check: ' : 'Availability: ',current.raw ? '事实说明：' : '投稿状态：') + '</strong>' + esc(current.entry.availability_note) + '</aside>' : '';
      rawDownload = current.raw; downloadName = story.id + '-' + (provider?.[0] || 'unknown') + '-' + language + '.md';
      main.innerHTML = '<section class="olympics op-reader">' + (route.view==='story'?link('stories',t('← All stories','← 所有故事'),'op-back'):storyNav) + link('olympics/' + story.id,t('Back to all six voices','返回六种声音'),'op-back') + providerNav + '<header class="op-reader-head"><p class="op-kicker">' + (selectedPick?t('MAXWELL’S PICK · ','MAXWELL 选稿 · '):'') + esc(provider?.[1] || t('Unknown provider','未知模型')) + (current.entry?.model ? ' · ' + esc(current.entry.model) : '') + '</p><h1>' + esc(selectedPick?.headline || (current.raw ? preview(current.raw).headlines[0] || title : title)) + '</h1><p class="op-date">' + esc(dateText) + ' · ' + t('Original event / report','原事件／报道日期') + '</p></header>' + (current.raw ? editorialArt(story.id,t) : '') + notice + '<div class="op-reader-tools">' + link('brief/' + story.id,t('Read the source brief','阅读事实资料')) + (current.media?.length ? '<button type="button" data-op-media-scroll aria-controls="' + esc(galleryID) + '">' + t('Photos & video (' + current.media.length + ')','图片与视频（' + current.media.length + '）') + '</button>' : '') + (current.raw ? '<a href="/api/olympics/original?path=' + encodeURIComponent(current.entry.article_path) + '" download>' + t('Download original Markdown','下载原始Markdown') + '</a>' : '') + '</div>' + contextPanel(data,current.entry,t) + editionNote + (current.raw ? '<article class="op-prose" lang="' + language + '">' + (selectedPick?selectedMarkdown(current.raw):displayMarkdown(current.raw)) + '</article>' : '<div class="op-empty"><h2>' + t('This edition is not available yet.','这个版本尚未可读。') + '</h2><p>' + t('No ' + (language === 'en' ? 'English' : 'Chinese') + ' edition is available for this model in this archive.','此档案暂无该模型可读的' + (language === 'en' ? '英文' : '中文') + '投稿。') + '</p></div>') + alternatives + mediaGallery(current.media || [],t,galleryID) + providerNav + '</section>';
    } else if (route.view === 'brief') {
      const brief = Object.hasOwn(data.briefs,briefPath) && typeof data.briefs[briefPath] === 'string' ? data.briefs[briefPath] : null;
      rawDownload = brief; downloadName = story.id + '-source-brief.md';
      main.innerHTML = '<section class="olympics op-reader">' + storyNav + link('olympics/' + story.id,t('Back to all six voices','返回六种声音'),'op-back') + '<header class="op-reader-head"><p class="op-kicker">' + t('COMMON SOURCE BRIEF','共同事实资料') + '</p><h1>' + esc(title) + '</h1></header><p class="op-notice">' + t('The same dated source material supplied to every model. Original language preserved.','所有模型收到同一份有日期的事实资料。保留资料原文语言。') + '</p>' + (brief ? '<div class="op-reader-tools"><a href="/api/olympics/original?path=' + encodeURIComponent(briefPath) + '" download>' + t('Download source brief','下载事实资料') + '</a></div><article class="op-prose">' + markdown(brief) + '</article>' : '<p class="op-empty">' + t('Source brief unavailable.','事实资料暂不可用。') + '</p>') + '</section>';
    } else {
      const cards = PROVIDERS.map(([id,name]) => {
        const {entry,raw,media} = slot(id), excerpt = raw ? preview(raw) : {headlines:[],teaser:''};
        return '<article class="op-voice"><header><img class="op-mark op-mark-' + id + '" src="/icons/' + id + '.svg" alt="" width="32" height="32"><h3>' + esc(name) + '</h3><p class="op-model">' + esc(entry?.model || t('Model unconfirmed','具体模型未确认')) + '</p></header>' + (pickFor(story.id)?.provider===id?'<p class="op-pick-badge">'+t('Maxwell’s pick · '+(language==='en'?'English':'Chinese'),'Maxwell 选稿 · '+(language==='en'?'英文':'中文'))+'</p>':'') + (raw ? '<ol class="op-headlines">' + excerpt.headlines.slice(0,3).map(headline => '<li>' + esc(headline) + '</li>').join('') + '</ol>' + (excerpt.headlines.length < 3 ? '<p class="op-unavailable">' + t('Headline options are not all separately marked in the original.','原稿未完整标出三个标题选项。') + '</p>' : '') + (excerpt.teaser ? '<p class="op-teaser">' + esc(excerpt.teaser) + '</p>' : '') + (media.length ? '<p class="op-media-badge">' + t(media.length + ' sourced media ' + (media.length === 1 ? 'item' : 'items'),media.length + ' 项来源媒体') + '</p>' : '') + link('edition/' + story.id + '/' + id,t('Read edition','阅读全文'),'op-read') : '<div class="op-missing"><p>' + t('Submission unavailable','此版本暂不可用') + '</p><small>' + t('No ' + (language === 'en' ? 'English' : 'Chinese') + ' edition is available in this archive.','此档案暂无可读的' + (language === 'en' ? '英文' : '中文') + '版本。') + '</small></div>' + link('edition/' + story.id + '/' + id,t('View availability','查看状态'),'op-read')) + '</article>';
      }).join('');
      main.innerHTML = '<section class="olympics">' + storyNav + '<div class="op-hero"><div class="op-hero-copy"><p class="op-kicker">' + t('MODEL OLYMPICS · THE EDITORS’ SALON','模型奥林匹克 · 编辑沙龙') + '</p><h1>' + t('One story. Six voices.','一个故事，六种声音。') + '</h1><p class="op-subtitle">' + t('Independent English & Chinese editions.','独立写作，英文与中文原稿。') + '</p><div class="op-story-intro"><p class="op-date">' + esc(dateText) + ' · ' + t('Original event / report','原事件／报道日期') + '</p><h2>' + esc(title) + '</h2><p class="op-summary">' + esc(localized(story.summary)) + '</p>' + (pickFor(story.id)?link('story/'+story.id,t('Read Maxwell’s pick →','阅读 Maxwell 选稿 →'),'op-read')+' · ':'') + link('brief/' + story.id,t('Read the source brief','阅读事实资料'),'op-brief-link') + '</div></div>' + editorialArt(story.id,t,'op-art op-editorial-art') + '</div>' + notice + '<div class="op-voices">' + cards + '</div><p class="op-colophon">' + t('Six independent editions. Maxwell’s picks are editorial choices, not measured audience winners.','六家独立原稿。Maxwell 的选稿属于编辑判断，不代表实测读者胜出。') + '</p></section>';
    }
    const click = event => {
      const mediaButton = event.target.closest?.('[data-op-media-scroll]');
      if (mediaButton && main.contains(mediaButton)) { event.preventDefault(); main.querySelector('[data-op-media-gallery]')?.scrollIntoView({behavior:'auto',block:'start'}); return; }
      const anchor = event.target.closest?.('[data-op-route]');
      if (anchor && main.contains(anchor) && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); if (onNavigate) onNavigate(anchor.dataset.opRoute); else global.location.hash = anchor.dataset.opRoute; }

    };
    main.addEventListener('click',click);
    unbind = () => { main.removeEventListener('click',click); main.classList.remove('olympics-host'); };
    return dispose;
  }
  global.iSunOlympics = Object.freeze({render,dispose,reset:() => { cache = null; },markdown,displayText,displayMarkdown,preview,safeURL,parseRoute});
})(window);
