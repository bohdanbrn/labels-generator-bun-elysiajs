(() => {
    const addEntryEl = document.getElementById("add_entry");
    const submitButtonEl = document.getElementById("submit_button");
    const resultContainerEl = document.getElementById("result_container");
    const downloadLinkEl = document.getElementById("download_link");

    addEntryEl.addEventListener("click", function () {
        const entriesContainer = document.getElementById("form_entries");
        const newEntry = document.querySelector(".entry").cloneNode(true);
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
            downloadLinkEl.innerHTML = "";
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

            downloadLinkEl.innerHTML = `<a href="${responseBody.filePath}">${responseBody.filePath}</a>`;
            resultContainerEl.className = "d-block";

            addEntryEl.disabled = false;
            submitButtonEl.disabled = false;
        } catch (err) {
            alert("Something went wrong!");
            console.error(err);
        }
    });
})();
