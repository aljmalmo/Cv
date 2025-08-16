function generateResume() {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        summary: document.getElementById('summary').value,
        education: document.getElementById('education').value.replace(/\n/g, '<br>'),
        experience: document.getElementById('experience').value.replace(/\n/g, '<br>'),
        skills: document.getElementById('skills').value.replace(/\n/g, '<br>')
    };

    const template = document.getElementById('template').value;
    let html = '';

    if (template === 'template1') {
        html = `
            <div class="resume template1">
                <h1>${data.name}</h1>
                <p>البريد: ${data.email} | الهاتف: ${data.phone}</p>
                <section><h2>الملخص</h2><p>${data.summary}</p></section>
                <section><h2>التعليم</h2><p>${data.education}</p></section>
                <section><h2>الخبرة</h2><p>${data.experience}</p></section>
                <section><h2>المهارات</h2><p>${data.skills}</p></section>
            </div>
        `;
    } else if (template === 'template2') {
        html = `
            <div class="resume template2">
                <div class="left">
                    <h2>الملخص</h2><p>${data.summary}</p>
                    <h2>المهارات</h2><p>${data.skills}</p>
                </div>
                <div class="right">
                    <h1>${data.name}</h1>
                    <p>البريد: ${data.email} | الهاتف: ${data.phone}</p>
                    <h2>التعليم</h2><p>${data.education}</p>
                    <h2>الخبرة</h2><p>${data.experience}</p>
                </div>
            </div>
        `;
    } else if (template === 'template3') {
        html = `
            <div class="resume template3">
                <h1>${data.name}</h1>
                <p>البريد: ${data.email} | الهاتف: ${data.phone}</p>
                <section><h2>الملخص</h2><p>${data.summary}</p></section>
                <section><h2>التعليم</h2><p>${data.education}</p></section>
                <section><h2>الخبرة</h2><p>${data.experience}</p></section>
                <section><h2>المهارات</h2><p>${data.skills}</p></section>
            </div>
        `;
    }

    document.getElementById('resumePreview').innerHTML = html;
    document.getElementById('resumePreview').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';
}

async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const resume = document.querySelector('.resume');
    
    html2canvas(resume, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('resume.pdf');
    });
          }
