// Save button handler
document.getElementById("saveBtn").addEventListener("click", async () => {
	const statusDiv = document.getElementById("status");
	const saveBtn = document.getElementById("saveBtn");

	try {
		// Disable button to prevent duplicate clicks
		saveBtn.disabled = true;
		statusDiv.textContent = "Fetching tabs...";
		statusDiv.className = "status info";

		// Get all tabs
		const tabs = await chrome.tabs.query({});

		// Extract URLs and add titles
		const content = tabs
			.map((tab, index) => {
				return `[${index + 1}] ${tab.title}\n${tab.url}`;
			})
			.join("\n\n");

		// Add timestamp and statistics
		const now = new Date();
		const timestamp = now.toLocaleString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});

		const header = `Saved at: ${timestamp}\nTotal tabs: ${tabs.length}\n\n${"=".repeat(60)}\n\n`;
		const finalContent = header + content;

		// Create download link
		const blob = new Blob([finalContent], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);

		// Generate filename (with timestamp)
		const filename = `tabs_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}.txt`;

		// Trigger download
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Clean up URL object
		setTimeout(() => URL.revokeObjectURL(url), 100);

		// Display success message
		statusDiv.textContent = `✓ Successfully saved ${tabs.length} tab URLs!`;
		statusDiv.className = "status success";
	} catch (error) {
		console.error("Save failed:", error);
		statusDiv.textContent = `✗ Save failed: ${error.message}`;
		statusDiv.className = "status error";
	} finally {
		// Re-enable button
		saveBtn.disabled = false;
	}
});

// Import button handler
document.getElementById("importBtn").addEventListener("click", () => {
	document.getElementById("fileInput").click();
});

// File input handler
document.getElementById("fileInput").addEventListener("change", async (event) => {
	const statusDiv = document.getElementById("status");
	const importBtn = document.getElementById("importBtn");
	const file = event.target.files[0];

	if (!file) {
		return;
	}

	try {
		// Disable button to prevent duplicate clicks
		importBtn.disabled = true;
		statusDiv.textContent = "Reading file...";
		statusDiv.className = "status info";

		// Read file content
		const text = await file.text();

		// Parse URLs from file
		const urls = parseURLsFromText(text);

		if (urls.length === 0) {
			statusDiv.textContent = "✗ No valid URLs found in file";
			statusDiv.className = "status error";
			return;
		}

		// Display progress
		statusDiv.textContent = `Opening ${urls.length} tabs...`;

		// Open all URLs in new tabs
		for (const url of urls) {
			await chrome.tabs.create({ url, active: false });
		}

		// Display success message
		statusDiv.textContent = `✓ Successfully opened ${urls.length} tabs!`;
		statusDiv.className = "status success";

		// Clear file input
		event.target.value = "";
	} catch (error) {
		console.error("Import failed:", error);
		statusDiv.textContent = `✗ Import failed: ${error.message}`;
		statusDiv.className = "status error";
	} finally {
		// Re-enable button
		importBtn.disabled = false;
	}
});

// Parse URLs from exported text file
function parseURLsFromText(text) {
	const urls = [];
	const lines = text.split("\n");

	for (const line of lines) {
		const trimmedLine = line.trim();
		// Match lines that start with http:// or https://
		if (trimmedLine.startsWith("http://") || trimmedLine.startsWith("https://")) {
			urls.push(trimmedLine);
		}
	}

	return urls;
}
