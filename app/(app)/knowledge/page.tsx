"use client";

import { useState } from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { KnowledgeArticle } from "@/types";

const ARTICLES: KnowledgeArticle[] = [
  {
    id: "1",
    title: "What is EOS?",
    slug: "what-is-eos",
    category: "Fundamentals",
    content: "The Entrepreneur Operating System (EOS) is a complete set of simple concepts and practical tools that help entrepreneurs get what they want from their businesses.",
    tags: ["eos", "overview", "fundamentals"],
    readTime: 3,
  },
  {
    id: "2",
    title: "The 6 Key Components of EOS",
    slug: "six-components",
    category: "Fundamentals",
    content: "Vision, People, Data, Issues, Process, Traction — the six components every business must master.",
    tags: ["eos", "components", "vision"],
    readTime: 5,
  },
  {
    id: "3",
    title: "Choosing the Right KPIs",
    slug: "choosing-kpis",
    category: "KPI Frameworks",
    content: "A KPI (Key Performance Indicator) should be measurable, actionable, and tied directly to your business goals.",
    tags: ["kpis", "metrics", "measurement"],
    readTime: 4,
  },
  {
    id: "4",
    title: "Setting Up Your Scorecard",
    slug: "scorecard-setup",
    category: "KPI Frameworks",
    content: "Your scorecard is a weekly snapshot of 5-15 metrics that give you a pulse on your business. Each number should have an owner and a weekly goal.",
    tags: ["scorecard", "metrics", "weekly"],
    readTime: 6,
  },
  {
    id: "5",
    title: "Revenue Metrics That Matter",
    slug: "revenue-metrics",
    category: "Growth Systems",
    content: "MRR, ARR, churn rate, LTV, CAC — learn which revenue metrics to track and how to interpret them.",
    tags: ["revenue", "mrr", "saas", "metrics"],
    readTime: 7,
  },
  {
    id: "6",
    title: "Building a Growth Dashboard",
    slug: "growth-dashboard",
    category: "Growth Systems",
    content: "A growth dashboard brings together acquisition, activation, retention, revenue, and referral metrics in one view.",
    tags: ["growth", "dashboard", "pirate-metrics"],
    readTime: 5,
  },
  {
    id: "7",
    title: "Connecting Google Sheets as a Data Source",
    slug: "google-sheets-guide",
    category: "Integrations",
    content: "Step-by-step guide to connecting a Google Sheet, mapping columns to metrics, and building widgets from your data.",
    tags: ["google-sheets", "integration", "guide"],
    readTime: 4,
  },
  {
    id: "8",
    title: "Understanding Your Stripe Revenue Data",
    slug: "stripe-revenue-guide",
    category: "Integrations",
    content: "How EOS pulls and normalizes Stripe data: revenue, MRR, ARR, churn, and subscription counts.",
    tags: ["stripe", "revenue", "integration"],
    readTime: 5,
  },
];

const CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))];

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<KnowledgeArticle | null>(null);

  const filtered = ARTICLES.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.includes(search.toLowerCase()));
    const matchesCategory = !activeCategory || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          EOS fundamentals, KPI frameworks, and integration guides
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !activeCategory
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Separator />

      {openArticle ? (
        /* Article view */
        <div className="space-y-4">
          <button
            onClick={() => setOpenArticle(null)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            ← Back to articles
          </button>
          <div>
            <Badge variant="outline" className="mb-3 text-xs">
              {openArticle.category}
            </Badge>
            <h2 className="text-2xl font-bold">{openArticle.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {openArticle.readTime} min read
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">{openArticle.content}</p>
          <div className="flex gap-2 flex-wrap pt-2">
            {openArticle.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        /* Article list */
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              No articles found
            </p>
          ) : (
            filtered.map((article) => (
              <button
                key={article.id}
                onClick={() => setOpenArticle(article)}
                className="w-full text-left flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors group"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{article.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} min read
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
