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
