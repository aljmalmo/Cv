function generateResume() {
    const form = document.getElementById('resumeForm');
    const photoFile = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = {
            name: document.getElementById('name').value,
            jobTitle: document.getElementById('jobTitle').value,
            photo: e.target.result || 'https://via.placeholder.com/150', // fallback إذا لم يكن هناك صورة
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            summary: document.getElementById('summary').value.replace(/\n/g, '<br>'),
            education: document.getElementById('education').value.split('\n').map(line => `<li>${line}</li>`).join(''),
            experience: document.getElementById('experience').value.split('\n').map(line => `<li>${line}</li>`).join(''),
            skills: document.getElementById('skills').value.split(',').map(skill => `<li>${skill.trim()}</li>`).join(''),
            languages: document.getElementById('languages').value.split(',').map(lang => `<li>${lang.trim()}</li>`).join('')
        };

        const template = document.getElementById('template').value;
        let html = '';

        if (template === 'template1') {
            html = `
                <div class="resume template1">
                    <div class="left">
                        <img src="${data.photo}" alt="Photo">
                        <h2>${data.name}<br><small>${data.jobTitle}</small></h2>
                        <ul class="contact">
                            <li><i class="fas fa-envelope"></i> ${data.email}</li>
                            <li><i class="fas fa-phone"></i> ${data.phone}</li>
                            <li><i class="fas fa-map-marker-alt"></i> ${data.address}</li>
                            <li><i class="fab fa-linkedin"></i> ${data.linkedin}</li>
                            <li><i class="fab fa-github"></i> ${data.github}</li>
                        </ul>
                        <h3>اللغات</h3>
                        <ul>${data.languages}</ul>
                    </div>
                    <div class="right">
                        <h3>الملخص</h3><p>${data.summary}</p>
                        <h3>التعليم</h3><ul>${data.education}</ul>
                        <h3>الخبرة</h3><ul>${data.experience}</ul>
                        <h3>المهارات</h3><ul>${data.skills}</ul>
                    </div>
                </div>
            `;
        } else if (template === 'template2') {
            html = `
                <div class="resume template2">
                    <div class="left">
                        <img src="${data.photo}" alt="Photo">
                        <h2>${data.name}</h2>
                        <p>${data.jobTitle}</p>
                        <p><i class="fas fa-envelope"></i> ${data.email}</p>
                        <p><i class="fas fa-phone"></i> ${data.phone}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${data.address}</p>
                        <p><i class="fab fa-linkedin"></i> ${data.linkedin}</p>
                        <p><i class="fab fa-github"></i> ${data.github}</p>
                        <h3>المهارات</h3>
                        <ul>${data.skills}</ul>
                        <!-- يمكن إضافة شرائط تقدم هنا إذا أردت -->
                    </div>
                    <div class="right">
                        <h3>الملخص</h3><p>${data.summary}</p>
                        <h3>التعليم</h3><ul>${data.education}</ul>
                        <h3>الخبرة</h3><ul>${data.experience}</ul>
                        <h3>اللغات</h3><ul>${data.languages}</ul>
                    </div>
                </div>
            `;
        } else if (template === 'template3') {
            html = `
                <div class="resume template3">
                    <div class="left">
                        <div class="profile">
                            <img src="${data.photo}" alt="Photo">
                            <h2>${data.name}</h2>
                            <p>${data.jobTitle}</p>
                        </div>
                        <div class="info">
                            <ul>
                                <li><i class="fas fa-map-marker-alt"></i> ${data.address}</li>
                                <li><i class="fas fa-phone"></i> ${data.phone}</li>
                                <li><i class="fas fa-envelope"></i> ${data.email}</li>
                                <li><i class="fab fa-linkedin"></i> ${data.linkedin}</li>
                                <li><i class="fab fa-github"></i> ${data.github}</li>
                            </ul>
                        </div>
                        <h3>المهارات</h3>
                        <ul class="skills">
                            ${document.getElementById('skills').value.split(',').map(skill => `
                                <li>
                                    <span class="name">${skill.trim()}</span>
                                    <div class="progress"><span style="width: ${Math.random()*40 + 60}%;"></span></div>
                                    <span class="per">${Math.floor(Math.random()*40 + 60)}%</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="right">
                        <h3>الملخص</h3><p>${data.summary}</p>
                        <h3>الخبرة</h3><ul>${data.experience}</ul>
                        <h3>التعليم</h3><ul>${data.education}</ul>
                        <h3>اللغات</h3><ul>${data.languages}</ul>
                    </div>
                </div>
            `;
        }

        document.getElementById('resumePreview').innerHTML = html;
        document.getElementById('resumePreview').style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'block';
    };

    if (photoFile) {
        reader.readAsDataURL(photoFile);
    } else {
        reader.onload(); // لاستخدام fallback
    }
}

async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const resume = document.querySelector('.resume');
    
    html2canvas(resume, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
    });
}
