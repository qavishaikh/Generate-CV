document.getElementById('cvForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const photoFile = document.getElementById('photo').files[0];

    const cvPreview = document.getElementById('cvPreview');

    if (photoFile) {
        const reader = new FileReader();
        reader.readAsDataURL(photoFile);
        reader.onload = function (event) {
            const photoDataUrl = event.target.result;

            // Create and set the content for the CV
            const cvContent = `
                <div style="font-family: Arial; padding: 20px;">
                    <h1 style="text-align: center;">Curriculum Vitae</h1>
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="flex: 1; padding-right: 20px;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Age:</strong> ${age}</p>
                            <p><strong>Phone Number:</strong> ${phone}</p>
                            <p><strong>Education:</strong> ${education}</p>
                            <p><strong>Skills:</strong> ${skills}</p>
                            <p><strong>Experience:</strong> ${experience}</p>
                        </div>
                        <div style="flex: 0;">
                            <img src="${photoDataUrl}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">
                        </div>
                    </div>
                </div>
            `;

            // Append the content to the cvPreview div
            cvPreview.innerHTML = cvContent;
            cvPreview.style.display = "block"; // Make sure it's visible for rendering

            // After appending the content, generate the PDF
            html2pdf()
                .from(cvPreview)
                .set({
                    margin: 1,
                    filename: `${name}_CV.pdf`,
                    html2canvas: { scale: 4 },
                    jsPDF: { orientation: 'portrait' }
                })
                .save();
        };
    } else {
        // If no photo is uploaded, generate the PDF without the image
        const cvContent = `
            <div style="font-family: Arial; padding: 20px;">
                <h1 style="text-align: center;">Curriculum Vitae</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Phone Number:</strong> ${phone}</p>
                <p><strong>Education:</strong> ${education}</p>
                <p><strong>Skills:</strong> ${skills}</p>
                <p><strong>Experience:</strong> ${experience}</p>
            </div>
        `;

        // Append the content to the cvPreview div
        cvPreview.innerHTML = cvContent;
        cvPreview.style.display = "block"; // Make sure it's visible for rendering

        html2pdf()
            .from(cvPreview)
            .set({
                margin: 1,
                filename: `${name}_CV.pdf`,
                html2canvas: { scale: 4 },
                jsPDF: { orientation: 'portrait' }
            })
            .save();
    }
});
