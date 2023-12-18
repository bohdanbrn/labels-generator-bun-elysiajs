(() => {
    const addEntryEl = document.getElementById("add_entry");
    const submitButtonEl = document.getElementById("submit_button");

    addEntryEl.addEventListener("click", function () {
        const entriesContainer = document.getElementById("form_entries");
        const newEntry = document.querySelector(".entry:last-child").cloneNode(true);
        newEntry.querySelector(".remove-entry").classList.remove("d-none");
        entriesContainer.appendChild(newEntry);
    });

    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("remove-entry")) {
            event.target.closest(".entry").remove();
        }
    });

    submitButtonEl.addEventListener("click", async function () {
        try {
            addEntryEl.disabled = true;
            submitButtonEl.disabled = true;

            const entries = document.querySelectorAll(".entry");
            const labelsData = [];

            entries.forEach((entry) => {
                const model = entry.querySelector("input[name='model[]']").value;
                const size = entry.querySelector("input[name='size[]']").value;
                const description = entry.querySelector("input[name='description[]']").value;
                const quantity = entry.querySelector("input[name='quantity[]']").value;

                labelsData.push({
                    model: model,
                    size: size,
                    description: description,
                    quantity: parseInt(quantity),
                });
            });

            const result = await fetch("/labels/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ labels: labelsData }),
            });

            const responseBody = await result.json();

            // validation error
            if (responseBody.error) {
                throw new Error(responseBody.error);
            }

            const fileName = responseBody.filePath.split("/").slice(-1)[0];

            downloadURI(responseBody.filePath, fileName);
        } catch (err) {
            alert("Something went wrong!");
            console.error(err);
        } finally {
            addEntryEl.disabled = false;
            submitButtonEl.disabled = false;
        }
    });

    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }
})();
