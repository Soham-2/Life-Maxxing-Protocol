import legacyHtmlUrl from "../lifemaxxing-v1.html?url";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#0a0a0a" }}>
      <iframe
        title="Life Maxxing Protocol Legacy App"
        src={legacyHtmlUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "0",
          background: "#0a0a0a",
        }}
      />
    </div>
  );
}
