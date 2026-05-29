const SKILLS = [
  "TypeScript", "JavaScript", "Rust", "PHP", "SQL", "Bash",
  "Node.js", "NestJS", "Tokio", "Axum", "SQLx", "Symfony", "Drupal",
  "Next.js", "React", "Ratatui",
  "Microservices", "Event-Driven Architecture", "Domain-Driven Design",
  "REST APIs", "WebSockets", "API Design",
  "Distributed Systems", "Real-Time Pipelines", "High Availability", "Low Latency",
  "Kubernetes", "Helm", "Docker", "Docker Compose",
  "Terraform", "GitOps", "ArgoCD", "GitHub Actions",
  "Azure", "AKS", "ACA", "Nginx", "Linux", "CI/CD",
  "PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "TimescaleDB",
  "JWT", "OAuth", "SIWE", "NATS", "RabbitMQ",
  "Anthropic Claude", "OpenAI", "LLM Apps", "RAG", "AI Agents",
  "Function Calling", "Prompt Engineering",
  "Claude Code", "Agentic IDE Workflows", "MCP Servers", "AI Code Review",
  "Grafana", "Distributed Tracing", "Structured Logging",
  "Vitest", "Cargo Test", "Unit Testing", "Integration Testing", "Contract Testing",
  "SLI/SLO/SLA", "Reliability Engineering",
  "Bitcoin", "Ethereum", "Base", "Solana", "Web3", "Blockchain",
  "Polymarket", "Hyperliquid", "Chainlink",
  "Chainstack", "Alchemy", "QuickNode",
  "Technical Leadership", "System Design", "Cloud Architecture",
  "Project Management", "Roadmapping", "Agile", "Scrum",
  "Hiring", "Mentoring", "Stakeholder Management",
  "Security & Compliance", "Quantitative Risk",
  "Technical Writing", "Documentation",
  "Startups", "Philosophy",
];

export default function SeoContent() {
  return (
    <article className="sr-only" aria-hidden="true">
      <h1>Behrad Khodayar — Software Engineer</h1>
      <p>
        Behrad Khodayar is a software engineer. He likes building well-architected,
        highly scalable, high-performance systems. He is interested in distributed systems & AI.
        Languages: English, Persian, Turkish.
      </p>
      <h2>Areas of expertise</h2>
      <ul>
        {SKILLS.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <h2>Find me elsewhere</h2>
      <ul>
        <li>
          <a href="https://github.com/behradkhodayar">GitHub: behradkhodayar</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/behrad-khodayar/">
            LinkedIn: behrad-khodayar
          </a>
        </li>
        <li>
          <a href="https://stackoverflow.com/users/6532189/behrad-khodayar">
            Stack Overflow: Behrad Khodayar
          </a>
        </li>
        <li>
          <a href="https://behradkhodayar.medium.com/">
            Medium: behradkhodayar
          </a>
        </li>
        <li>
          <a href="https://www.reddit.com/user/behradkhodayar/">
            Reddit: behradkhodayar
          </a>
        </li>
      </ul>
    </article>
  );
}
