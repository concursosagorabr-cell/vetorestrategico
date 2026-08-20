import { ContactFormData, LeadFormData, QuizSubmissionData, QuizResultData } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function submitContact(data: ContactFormData) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao enviar mensagem de contato. Tente novamente.");
  }

  return response.json();
}

export async function submitLead(data: LeadFormData) {
  const response = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao enviar informações do lead. Tente novamente.");
  }

  return response.json();
}

export async function submitQuiz(data: QuizSubmissionData): Promise<QuizResultData> {
  const response = await fetch(`${API_BASE}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao calcular diagnóstico de IA. Tente novamente.");
  }

  return response.json();
}

export async function subscribeNewsletter(email: string, source: string = "blog_footer") {
  const response = await fetch(`${API_BASE}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao assinar newsletter. Tente novamente.");
  }

  return response.json();
}
