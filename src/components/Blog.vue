<template>
  <section id="blog">
    <div class="section-wrapper">
      <div class="section-header">
        <h2>Blog</h2>
        <div class="underline"></div>
        <p>Updates on projects, YouTube, coding, and how I organize things.</p>
      </div>

      <div class="filters">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['filter', activeCategory === cat.id ? 'active' : '']"
          @click="setCategory(cat.id)"
        >
          <i :class="cat.icon"></i>
          {{ cat.name }}
        </button>
        <button
          :class="['filter', activeCategory === 'all' ? 'active' : '']"
          @click="setCategory('all')"
        >
          <i class="fas fa-th-large"></i>
          All
        </button>
      </div>

      <div class="posts-grid">
        <article v-for="post in filteredPosts" :key="post.slug" class="post-card">
          <div class="post-meta">
            <span class="badge">{{ getCategoryName(post.category) }}</span>
            <time :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
          </div>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-actions">
            <router-link :to="'/blog/' + post.slug" class="action-btn">
              Read Post
              <i class="fas fa-arrow-right"></i>
            </router-link>
            <a :href="routerBase + '/blog/' + post.slug" target="_blank" class="action-btn ghost">
              Open in new tab
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
  
</template>

<script>
import { blogPosts, blogCategories } from '../data/blogPosts';

export default {
  name: 'Blog',
  data() {
    return {
      posts: blogPosts,
      categories: blogCategories,
      activeCategory: 'all',
      routerBase: ''
    };
  },
  created() {
    // Vite dev server serves at '/', production base may change; keep simple
    this.routerBase = '';
  },
  computed: {
    filteredPosts() {
      if (this.activeCategory === 'all') return this.posts;
      return this.posts.filter(p => p.category === this.activeCategory);
    }
  },
  methods: {
    setCategory(id) { this.activeCategory = id; },
    getCategoryName(id) {
      return (this.categories.find(c => c.id === id) || {}).name || id;
    },
    formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }
};
</script>

<style scoped>
#blog {
  background-color: #0D0D0D;
  background-image: linear-gradient(to bottom, #0D0D0D, #181818);
  min-height: 100vh;
  width: 100%;
  padding: 4rem 2rem;
  box-sizing: border-box;
}

.section-wrapper { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 2.5rem; }
h2 { font-size: 3rem; color: #fff; margin-bottom: 0.6rem; font-weight: 700; }
.underline { height: 4px; width: 90px; background: linear-gradient(90deg, #71D9B3, #4D208C); margin: 0 auto; border-radius: 2px; }
.section-header p { color: #AED8F2; margin-top: 1rem; }

.filters { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; margin-bottom: 2rem; }
.filter { background: rgba(255,255,255,0.06); color: #AED8F2; border: 1px solid rgba(255,255,255,0.12); padding: 0.5rem 0.9rem; border-radius: 999px; cursor: pointer; }
.filter.active { background: linear-gradient(135deg, #806FBF, #71D9B3); color: #fff; border-color: transparent; }

.posts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem; }
.post-card { background: rgba(26, 30, 38, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.25rem; transition: transform .25s ease, box-shadow .25s ease; }
.post-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(113, 217, 179, 0.15); }
.post-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
.badge { background: rgba(113, 217, 179, 0.15); color: #71D9B3; border: 1px solid rgba(113, 217, 179, 0.35); padding: 0.2rem 0.55rem; border-radius: 999px; font-size: 0.75rem; }
.post-title { color: #fff; font-size: 1.2rem; margin: .25rem 0 .4rem; }
.post-excerpt { color: #AED8F2; font-size: 0.95rem; }
.post-actions { display: flex; gap: .6rem; margin-top: .9rem; }
.action-btn { display: inline-flex; align-items: center; gap: .4rem; padding: .5rem .8rem; border-radius: 8px; text-decoration: none; color: #fff; background: linear-gradient(135deg, #806FBF, #71D9B3); }
.action-btn.ghost { background: transparent; color: #AED8F2; border: 1px solid rgba(255,255,255,0.15); }
</style>


