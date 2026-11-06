import Button from "@/components/Button/Button";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        padding: "120px 0",
      }}
    >
      <h1>Page not found</h1>
      <Button href="/catalog" style={{ width: 200 }}>
        Back to catalog
      </Button>
    </main>
  );
}
