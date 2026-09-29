/* Model Olympics: isolated presentation. No feed, signal, storage, or ranking calls. */
(function (global) {
  'use strict';
  const PROVIDERS = [['chatgpt','ChatGPT'],['claude','Claude'],['gemini','Gemini'],['grok','Grok'],['deepseek','DeepSeek'],['qwen','Qwen']];
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
  function markdown(raw) {
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
      if (quote.length || list.length) flush(); paragraph.push(line);
    }
    flush(); if (code !== null) out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
    return out.join('\n');
  }
  const plain = line => line.replace(/^\s*(?:#{1,6}\s*|\d+[.)]\s*|[-+]\s*)/,'').replace(/\*\*|__|`/g,'').replace(/^\*|\*$/g,'').trim();
  function preview(raw) {
    const lines = String(raw).replace(/\r\n?/g,'\n').split('\n');
    const headlines = []; let last = -1;
    for (let i = 0; i < Math.min(lines.length,80) && headlines.length < 3; i++) {
      const line = plain(lines[i]), colon = line.search(/[:：]/);
      if (colon < 0 || colon > 55) continue;
      const label = line.slice(0,colon);
      if (!/suspens|emotion|counter[ -]*intuitive|悬|情感|情韵|动情|共鸣|共情|抒情|浪漫|反直觉|反常识|反常|反转|逆思/i.test(label)) continue;
      let headline = line.slice(colon + 1).trim(), end = i;
      if (!headline) { end = i + 1; while (end < lines.length && !lines[end].trim()) end++; headline = plain(lines[end] || ''); }
      if (headline) { headlines.push(headline); last = end; i = end; }
    }
    const blocks = lines.slice(last + 1).join('\n').split(/\n\s*\n/);
    const paragraph = blocks.map(block => block.split('\n').filter(line => !/^\s*(?:#{1,6}\s|---|Writing\s*$|Worked for |(?:Gemini|Claude|ChatGPT) said\s*$)/i.test(line)).map(plain).join(' ').trim()).find(block => block.length >= 55) || '';
    return {headlines, teaser: paragraph.length > 180 ? paragraph.slice(0,180).replace(/\s+\S*$/,'') + '…' : paragraph};
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
    const topics = stories.filter(story => rows.some(row => row.topic === story.id));
    const story = topics.find(item => item.id === route.topic) || (!route.topic ? topics[0] : null);
    const link = (target, label, cls = '') => '<a class="' + cls + '" data-op-route="' + esc(target) + '" href="#' + esc(target) + '">' + label + '</a>';
    const slot = provider => {
      const matches = rows.filter(row => row.topic === story?.id && row.provider === provider && row.language === language);
      const entry = matches.length === 1 ? matches[0] : null;
      const expected = 'articles/' + story?.id + '/' + provider + '/' + (language === 'en' ? 'english' : 'chinese') + '.md';
      const raw = entry?.status === 'available' && entry.article_path === expected && Object.hasOwn(data.articles,expected) && typeof data.articles[expected] === 'string' ? data.articles[expected] : null;
      return {entry,raw,media:raw === null ? [] : editionMedia(data,story.id,provider,language)};
    };
    const title = story?.id === 'eviltokens-real-login-trap' ? t('The login page was real. That was the trap.','登录页是真的。陷阱也是真的。') : localized(story?.title) || story?.headline || '';
    const storyNav = '<nav class="op-topics" aria-label="' + t('Choose a story','选择故事') + '">' + topics.map(item => link('olympics/' + encodeURIComponent(item.id),esc(LABELS[item.id]?.[language === 'zh' ? 1 : 0] || localized(item.title)), 'op-topic' + (item.id === story?.id ? ' is-active' : ''))).join('') + '</nav>';
    const providerNav = '<nav class="op-providers" aria-label="' + t('Choose an edition','选择模型版本') + '">' + PROVIDERS.map(([id,name]) => link('edition/' + story?.id + '/' + id,esc(name),'op-provider-link' + (route.provider === id ? ' is-active' : ''))).join('') + '</nav>';
    const notice = '<p class="op-notice">' + t('Original model drafts. Not independently fact-checked. Source briefs are separate.','模型原稿，尚未经独立事实核查。事实资料另列。') + '</p>';
    const eventDate = story?.event_date || rows.find(row => row.topic === story?.id)?.event_date;
    const dateText = /^\d{4}-\d{2}-\d{2}$/.test(eventDate || '') ? new Date(eventDate + 'T00:00:00Z').toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-GB',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}) : t('Date unknown','日期未知');
    const briefPath = 'briefs/' + story?.id + '.md';
    let rawDownload = null, downloadName = '';
    if (!story) {
      main.innerHTML = '<section class="olympics op-empty"><h1>' + t('Story unavailable','故事暂不可用') + '</h1>' + link('olympics',t('Back to the salon','返回沙龙')) + '</section>';
    } else if (route.view === 'edition') {
      const provider = PROVIDERS.find(([id]) => id === route.provider), current = provider ? slot(provider[0]) : {raw:null,entry:null};
      const supplements=(data.supplements||[]).filter(item=>item.topic===story.id&&item.provider===provider?.[0]&&item.language===language);
      const alternatives=supplements.map(item=>'<details class="op-prose"><summary>'+t('Additional original from Qwen','Qwen 的另一份原稿')+'</summary><p class="op-notice">'+t('Qwen offered two alternatives. Both are preserved; no preference was submitted. The main edition follows the response displayed by Qwen when the conversation continued. Individual backend identities were not disclosed.','Qwen 同时提供了两份稿件，均已保留，未提交偏好投票。主版本沿用继续对话时 Qwen 默认显示的稿件；每份稿件的底层模型身份未披露。')+'</p><a href="/api/olympics/original?path='+encodeURIComponent(item.article_path)+'" download>'+t('Download additional original','下载另一份原稿')+'</a>'+markdown(item.text)+'</details>').join('');
      const galleryID = 'op-media-' + story.id + '-' + (provider?.[0] || 'unknown') + '-' + language;
      rawDownload = current.raw; downloadName = story.id + '-' + (provider?.[0] || 'unknown') + '-' + language + '.md';
      main.innerHTML = '<section class="olympics op-reader">' + storyNav + link('olympics/' + story.id,t('Back to all six voices','返回六种声音'),'op-back') + providerNav + '<header class="op-reader-head"><p class="op-kicker">' + esc(provider?.[1] || t('Unknown provider','未知模型')) + (current.entry?.model ? ' · ' + esc(current.entry.model) : '') + '</p><h1>' + esc(current.raw ? preview(current.raw).headlines[0] || title : title) + '</h1><p class="op-date">' + esc(dateText) + ' · ' + t('Original event / report','原事件／报道日期') + '</p></header>' + notice + '<div class="op-reader-tools">' + link('brief/' + story.id,t('Read the source brief','阅读事实资料')) + (current.media?.length ? '<button type="button" data-op-media-scroll aria-controls="' + esc(galleryID) + '">' + t('Photos & video (' + current.media.length + ')','图片与视频（' + current.media.length + '）') + '</button>' : '') + (current.raw ? '<a href="/api/olympics/original?path=' + encodeURIComponent(current.entry.article_path) + '" download>' + t('Download original Markdown','下载原始Markdown') + '</a>' : '') + '</div>' + (current.raw ? '<article class="op-prose" lang="' + language + '">' + markdown(current.raw) + '</article>' : '<div class="op-empty"><h2>' + t('This edition is not available yet.','这个版本尚未可读。') + '</h2><p>' + t('No ' + (language === 'en' ? 'English' : 'Chinese') + ' edition is available for this model in this archive.','此档案暂无该模型可读的' + (language === 'en' ? '英文' : '中文') + '投稿。') + '</p></div>') + alternatives + mediaGallery(current.media || [],t,galleryID) + providerNav + '</section>';
    } else if (route.view === 'brief') {
      const brief = Object.hasOwn(data.briefs,briefPath) && typeof data.briefs[briefPath] === 'string' ? data.briefs[briefPath] : null;
      rawDownload = brief; downloadName = story.id + '-source-brief.md';
      main.innerHTML = '<section class="olympics op-reader">' + storyNav + link('olympics/' + story.id,t('Back to all six voices','返回六种声音'),'op-back') + '<header class="op-reader-head"><p class="op-kicker">' + t('COMMON SOURCE BRIEF','共同事实资料') + '</p><h1>' + esc(title) + '</h1></header><p class="op-notice">' + t('The same dated source material supplied to every model. Original language preserved.','所有模型收到同一份有日期的事实资料。保留资料原文语言。') + '</p>' + (brief ? '<div class="op-reader-tools"><a href="/api/olympics/original?path=' + encodeURIComponent(briefPath) + '" download>' + t('Download source brief','下载事实资料') + '</a></div><article class="op-prose">' + markdown(brief) + '</article>' : '<p class="op-empty">' + t('Source brief unavailable.','事实资料暂不可用。') + '</p>') + '</section>';
    } else {
      const cards = PROVIDERS.map(([id,name]) => {
        const {entry,raw,media} = slot(id), excerpt = raw ? preview(raw) : {headlines:[],teaser:''};
        return '<article class="op-voice"><header><img class="op-mark op-mark-' + id + '" src="/icons/' + id + '.svg" alt="" width="32" height="32"><h3>' + esc(name) + '</h3><p class="op-model">' + esc(entry?.model || t('Model unconfirmed','具体模型未确认')) + '</p></header>' + (raw ? '<ol class="op-headlines">' + excerpt.headlines.slice(0,1).map(headline => '<li>' + esc(headline) + '</li>').join('') + '</ol>' + (excerpt.headlines.length < 3 ? '<p class="op-unavailable">' + t('Headline options are not all separately marked in the original.','原稿未完整标出三个标题选项。') + '</p>' : '') + (excerpt.teaser ? '<p class="op-teaser">' + esc(excerpt.teaser) + '</p>' : '') + (media.length ? '<p class="op-media-badge">' + t(media.length + ' sourced media ' + (media.length === 1 ? 'item' : 'items'),media.length + ' 项来源媒体') + '</p>' : '') + link('edition/' + story.id + '/' + id,t('Read edition','阅读全文'),'op-read') : '<div class="op-missing"><p>' + t('Submission unavailable','此版本暂不可用') + '</p><small>' + t('No ' + (language === 'en' ? 'English' : 'Chinese') + ' edition is available in this archive.','此档案暂无可读的' + (language === 'en' ? '英文' : '中文') + '版本。') + '</small></div>' + link('edition/' + story.id + '/' + id,t('View availability','查看状态'),'op-read')) + '</article>';
      }).join('');
      main.innerHTML = '<section class="olympics">' + storyNav + '<div class="op-hero"><div class="op-hero-copy"><p class="op-kicker">' + t('MODEL OLYMPICS · THE EDITORS’ SALON','模型奥林匹克 · 编辑沙龙') + '</p><h1>' + t('One story. Six voices.','一个故事，六种声音。') + '</h1><p class="op-subtitle">' + t('Independent English & Chinese editions.','独立写作，英文与中文原稿。') + '</p><div class="op-story-intro"><p class="op-date">' + esc(dateText) + ' · ' + t('Original event / report','原事件／报道日期') + '</p><h2>' + esc(title) + '</h2><p class="op-summary">' + esc(localized(story.summary)) + '</p>' + link('brief/' + story.id,t('Read the source brief','阅读事实资料'),'op-brief-link') + '</div></div>' + (ART[story.id] ? '<figure class="op-art"><img src="/images/' + ART[story.id] + '.jpg" alt="' + esc(t('Conceptual illustration for ' + title,'故事概念插画：' + title)) + '" width="1200" height="900" decoding="async" fetchpriority="high"><figcaption>' + t('AI illustration','AI概念插画') + '</figcaption></figure>' : '') + '</div>' + notice + '<div class="op-voices">' + cards + '</div><p class="op-colophon">' + t('Six independent editions. Robin makes the editorial decision.','六个独立版本，由Robin作编辑决定。') + '</p></section>';
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
  global.iSunOlympics = Object.freeze({render,dispose,reset:() => { cache = null; },markdown,preview,safeURL,parseRoute});
})(window);
