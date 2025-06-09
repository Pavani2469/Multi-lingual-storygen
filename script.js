document.getElementById("generateBtn").addEventListener("click", async () => {
  const keywords = document.getElementById("keywords").value.split(",").map(k => k.trim());
  const maxLength = parseInt(document.getElementById("length").value);
  const language = document.getElementById("language").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/generate_story/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords: keywords,
        max_length: maxLength,
        language: language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Something went wrong");
    }

    document.getElementById("storyText").textContent = data.story;
  } catch (err) {
    document.getElementById("storyText").textContent = `❌ ${err.message}`;
  }
});
