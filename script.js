
fetch('code_data.json')
  .then(res => res.json())
  .then(data => {
    const codeInput = document.getElementById('codeInput');
    const showBtn = document.getElementById('showBtn');
    const clearBtn = document.getElementById('clearBtn');
    const photo = document.getElementById('photo');
    const preview = document.getElementById('preview');
    const meta = document.getElementById('meta');

    showBtn.onclick = () => {
      const codeText = codeInput.value.toLowerCase();
      let bestMatch = {photo: 'default.png', score: 0};
      data.forEach(item => {
        let score = 0;
        item.keywords.forEach(k => { if(codeText.includes(k)) score++; });
        if(score > bestMatch.score) bestMatch = {photo: item.photo, score};
      });
      photo.src = 'images/' + bestMatch.photo;
      meta.innerText = 'Matched: ' + bestMatch.photo + ' (score: ' + bestMatch.score + ')';
      preview.style.display = 'flex';
    };

    clearBtn.onclick = () => {
      codeInput.value = '';
      preview.style.display = 'none';
      photo.src = 'images/default.png';
    };
  });
