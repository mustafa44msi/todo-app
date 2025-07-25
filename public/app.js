// Görevleri listeleme fonksiyonu
async function getTasks() {
  try {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');

      // Tamamlandı checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.style.marginRight = '8px';

      checkbox.addEventListener('change', async () => {
        const updateRes = await fetch(`/api/tasks/${task._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: checkbox.checked }),
        });
        if (!updateRes.ok) alert('Durum güncellenirken hata oluştu');
        else getTasks();
      });

      li.appendChild(checkbox);

      // Görev başlığı (düzenlenebilir)
      const span = document.createElement('span');
      span.textContent = task.title;
      span.style.cursor = 'pointer';

      span.addEventListener('click', () => openEditModal(task));

      li.appendChild(span);

      // Oluşturulma tarihi göster
      const dateSpan = document.createElement('span');
      const date = new Date(task.createdAt);
      dateSpan.textContent = date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      //dateSpan.style.marginLeft = '10px';
      dateSpan.style.fontSize = '0.85em';
      dateSpan.style.color = '#666';

      li.appendChild(dateSpan);

      // Sil butonu oluştur
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Sil';
      deleteBtn.style.marginLeft = '10px';

      deleteBtn.addEventListener('click', async () => {
        const deleteRes = await fetch(`/api/tasks/${task._id}`, {
          method: 'DELETE',
        });
        if (deleteRes.ok) {
          getTasks();
        } else {
          alert('Görev silinirken hata oluştu');
        }
      });

      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  } catch (err) {
    console.error('Görevler alınırken hata:', err);
  }
}

// Görev ekleme işlemi
document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = e.target.title.value.trim();

  if (!title) {
    alert('Lütfen bir görev başlığı girin');
    return;
  }

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      e.target.title.value = ''; // Formu temizle
      getTasks(); // Listeyi yenile
    } else {
      alert('Görev eklenirken hata oluştu');
    }
  } catch (err) {
    alert('Görev eklenirken hata oluştu');
    console.error(err);
  }
});

// Sayfa yüklendiğinde görevleri getir
window.addEventListener('DOMContentLoaded', getTasks);


const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

let currentEditTaskId = null;

function openEditModal(task) {
  currentEditTaskId = task._id;
  editInput.value = task.title;
  editModal.style.display = 'block';
  editInput.focus();
}

saveEditBtn.addEventListener('click', async () => {
  const newTitle = editInput.value.trim();
  if (!newTitle) {
    alert('Görev başlığı boş olamaz!');
    return;
  }

  try {
    const res = await fetch(`/api/tasks/${currentEditTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });
    if (res.ok) {
      getTasks();            // Listeyi yenile
      editModal.style.display = 'none';  // Modalı kapat
      currentEditTaskId = null;
    } else {
      alert('Güncelleme başarısız oldu');
    }
  } catch (err) {
    alert('Güncelleme hatası');
  }
});

cancelEditBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
  currentEditTaskId = null;
});

const toggle = document.getElementById('toggleDarkMode');

// Sayfa yüklendiğinde dark mode açık mı diye kontrol et
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  toggle.checked = true;
}

toggle.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'disabled');
  }
});

