const contentMap = {
  siteUrl: 'https://index-m-leyu.com.cn',
  defaultTag: '乐鱼体育',
  sections: [
    {
      id: 'home',
      title: '首页',
      tags: ['乐鱼体育', '首页推荐'],
      keywords: ['体育资讯', '比分直播']
    },
    {
      id: 'news',
      title: '新闻中心',
      tags: ['乐鱼体育', '新闻动态'],
      keywords: ['赛事报道', '转会消息', '赛后分析']
    },
    {
      id: 'video',
      title: '视频专区',
      tags: ['乐鱼体育', '精彩视频'],
      keywords: ['高光集锦', '赛事回放', '专题纪录片']
    },
    {
      id: 'community',
      title: '社区互动',
      tags: ['乐鱼体育', '球迷社区'],
      keywords: ['讨论区', '投票', '每日话题']
    }
  ]
};

function searchContent(query, sectionList) {
  if (!query || query.trim().length === 0) {
    return [];
  }
  const lowerQuery = query.toLowerCase();
  const results = [];
  for (const section of sectionList) {
    const combined = section.title + ' ' + section.keywords.join(' ') + ' ' + section.tags.join(' ');
    if (combined.toLowerCase().includes(lowerQuery)) {
      results.push({
        id: section.id,
        title: section.title,
        matched: true
      });
    }
  }
  return results;
}

function renderSearchResults(query) {
  const found = searchContent(query, contentMap.sections);
  if (found.length === 0) {
    console.log(`在 "${contentMap.siteUrl}" 中，未找到与 "${query}" 相关的内容。`);
    return;
  }
  console.log(`在 "${contentMap.siteUrl}" 中找到 ${found.length} 个相关分区：`);
  found.forEach((item, index) => {
    console.log(`${index + 1}. [${item.id}] ${item.title}`);
  });
}

function getSectionByTag(tag) {
  const normalized = tag.trim().toLowerCase();
  return contentMap.sections.filter(s => {
    return s.tags.some(t => t.toLowerCase() === normalized);
  });
}

function listAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(s => {
    s.tags.forEach(t => tagSet.add(t));
  });
  return Array.from(tagSet);
}

function getSectionById(id) {
  return contentMap.sections.find(s => s.id === id) || null;
}

function addSection(newSection) {
  if (!newSection.id || !newSection.title) {
    console.warn('新增分区必须包含 id 和 title');
    return false;
  }
  const exists = contentMap.sections.some(s => s.id === newSection.id);
  if (exists) {
    console.warn(`分区 id "${newSection.id}" 已存在`);
    return false;
  }
  const section = {
    id: newSection.id,
    title: newSection.title,
    tags: newSection.tags || [],
    keywords: newSection.keywords || []
  };
  contentMap.sections.push(section);
  return true;
}

console.log('站点内容映射初始化完成。');
console.log('默认标签:', contentMap.defaultTag);
renderSearchResults('乐鱼体育');
console.log('所有标签:', listAllTags());