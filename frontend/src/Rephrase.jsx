import { useRef, useState } from "react";

export default function Rephrase() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const controllerRef = useRef(null);

    const onProcess = async () => {
        setError("");
        setResult(null);
        setLoading(true);

        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const res = await fetch("http://localhost:8000/api/rephrase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: input }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const detail = (await res.json().catch(() => ({})))?.detail || "Request failed";
                throw new Error(detail);
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            if (err.name !== "AbortError") setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
            controllerRef.current = null;
        }
    };

    const onCancel = () => {
        controllerRef.current?.abort();
    };

    const disabled = loading || !input.trim();

    return (
        <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "system-ui" }}>
            <h1>AI Writing Style Assistant</h1>
            <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something…"
                style={{ width: "100%", padding: 12, fontSize: 16 }}
                disabled={loading}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button onClick={onProcess} disabled={disabled} style={{ padding: "8px 14px" }}>
                    {loading ? "Processing…" : "Process"}
                </button>
                <button onClick={onCancel} disabled={!loading} style={{ padding: "8px 14px" }}>
                    Cancel
                </button>
            </div>

            {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

            {result && (
                <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                    <Card title="Professional" text={result.professional} />
                    <Card title="Casual" text={result.casual} />
                    <Card title="Polite" text={result.polite} />
                    <Card title="Social-media" text={result.social_media} />
                </div>
            )}
        </div>
    );
}

function Card({ title, text }) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
            <div>{text}</div>
        </div>
    );
}
