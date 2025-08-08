<template>
  <section id="blog-post">
    <div class="post-wrapper">
      <router-link to="/blog" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Back to Blog
      </router-link>

      <article v-if="post" class="post-content">
        <header class="post-header">
          <span class="badge">{{ categoryName }}</span>
          <h1>{{ post.title }}</h1>
          <time :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
        </header>
        <div class="content" v-html="post.content"></div>
      </article>

      <div v-else class="not-found">
        <h2>Post not found</h2>
        <p>The article you’re looking for doesn’t exist.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { findPostBySlug, blogCategories } from '../data/blogPosts';

export default {
  name: 'BlogPost',
  data() {
    return { post: null };
  },
  computed: {
    categoryName() {
      if (!this.post) return '';
      const c = blogCategories.find(c => c.id === this.post.category);
      return c ? c.name : this.post.category;
    }
  },
  created() {
    const { slug } = this.$route.params;
    this.post = findPostBySlug(slug);
  },
  methods: {
    formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }
};
</script>

<style scoped>
#blog-post { background: #0D0D0D; background-image: linear-gradient(to bottom, #0D0D0D, #181818); min-height: 100vh; padding: 4rem 1.5rem; }
.post-wrapper { max-width: 900px; margin: 0 auto; }
.back-link { color: #71D9B3; text-decoration: none; display: inline-flex; align-items: center; gap: .4rem; margin-bottom: 1rem; }
.post-content { background: rgba(26,30,38,.8); border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 2rem; }
.post-header { border-bottom: 1px solid rgba(255,255,255,.08); padding-bottom: 1rem; margin-bottom: 1rem; }
.badge { background: rgba(113, 217, 179, 0.15); color: #71D9B3; border: 1px solid rgba(113, 217, 179, 0.35); padding: 0.2rem 0.55rem; border-radius: 999px; font-size: 0.75rem; }
h1 { color: #fff; margin: .6rem 0 .2rem; }
time { color: #8aa6ba; font-size: .95rem; }
.content :deep(p) { color: #AED8F2; line-height: 1.7; }
.content :deep(ul) { color: #AED8F2; padding-left: 1.2rem; }
.not-found { color: #AED8F2; text-align: center; margin-top: 3rem; }
</style>


