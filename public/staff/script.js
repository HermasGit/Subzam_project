document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('stage-selector');
  const hidden = document.getElementById('selected-stage');
  selector.addEventListener('click', e => {
    if (e.target.classList.contains('stage-btn')) {
      document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('selected'));
      e.target.classList.add('selected');
      hidden.value = e.target.dataset.value;
    }
  });
  document.getElementById('production-form').addEventListener('submit', async e => {
    e.preventDefault();
    const entryDate = document.getElementById('entry-date').value;
    const person = document.getElementById('person').value;
    const batch = document.getElementById('batch').value;
    const stage = document.getElementById('selected-stage').value;
    const quantity = document.getElementById('quantity').value;
    const feedback = document.getElementById('feedback-message');
    feedback.style.display = 'none';

    // Prepare data
    const data = {
      entry_date: entryDate,
      person_in_charge: person,
      batch_number: batch,
      stage: stage,
      quantity: quantity
    };

    const editId = document.getElementById('production-form').getAttribute('data-edit-id');
    let url = '/api/production';
    let method = 'POST';
    if (editId) {
      url = `/api/production/${editId}`;
      method = 'PUT';
    }
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        feedback.textContent = editId ? 'Update successful!' : 'Submission successful!';
        feedback.className = 'success';
        feedback.style.display = 'block';
        document.getElementById('production-form').reset();
        document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('production-form').removeAttribute('data-edit-id');
        document.getElementById('submit-button').textContent = 'Submit';
        loadSubmissions();
      } else {
        feedback.textContent = result.message || 'Submission failed.';
        feedback.className = 'error';
        feedback.style.display = 'block';
      }
    } catch (err) {
      feedback.textContent = 'Network error. Please try again.';
      feedback.className = 'error';
      feedback.style.display = 'block';
    }
  });

  // Fetch and display submissions
  async function loadSubmissions() {
    const list = document.getElementById('submissions-list');
    list.innerHTML = '<em>Loading...</em>';
    try {
      const res = await fetch('/api/production');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        list.innerHTML = '';
        data.forEach(entry => {
          const div = document.createElement('div');
          div.className = 'submission-row';
          div.style = 'margin-bottom:12px;padding:12px;border:1px solid #eee;border-radius:8px;';
          div.innerHTML = `
            <strong>Date:</strong> ${entry.entry_date} | <strong>Batch:</strong> ${entry.batch_number} | <strong>Stage:</strong> ${entry.stage} | <strong>Qty:</strong> ${entry.quantity}<br>
            <strong>Person:</strong> ${entry.notes}
            <button class="edit-btn" data-id="${entry.id}" style="margin-left:12px;font-family:'Poppins',sans-serif;">Edit</button>
          `;
          list.appendChild(div);
        });
      } else {
        list.innerHTML = '<em>No submissions yet.</em>';
      }
    } catch (err) {
      list.innerHTML = '<span style="color:#C62828">Failed to load submissions.</span>';
    }
  }

  // Handle edit button click
  async function handleEdit(e) {
    if (e.target.classList.contains('edit-btn')) {
      const id = e.target.getAttribute('data-id');
      // Fetch entry data
      const res = await fetch('/api/production');
      const data = await res.json();
      const entry = data.find(x => x.id == id);
      if (entry) {
        document.getElementById('entry-date').value = entry.entry_date;
        document.getElementById('person').value = entry.notes;
        document.getElementById('batch').value = entry.batch_number;
        document.getElementById('quantity').value = entry.quantity;
        document.getElementById('selected-stage').value = entry.stage;
        document.querySelectorAll('.stage-btn').forEach(b => {
          b.classList.toggle('selected', b.dataset.value === entry.stage);
        });
        document.getElementById('submit-button').textContent = 'Update';
        document.getElementById('production-form').setAttribute('data-edit-id', id);
      }
    }
  }

  loadSubmissions();
  document.getElementById('submissions-list').addEventListener('click', handleEdit);
});
