const apiUrl = 'http://localhost:5000/api/programs';

document.addEventListener('DOMContentLoaded', () => {
  loadAgenda();
  loadCrudForm();
});

async function loadAgenda() {
  const response = await fetch(apiUrl);
  const programs = await response.json();

  const agendaDiv = document.getElementById('agenda');
  agendaDiv.innerHTML = '';

  programs.forEach(program => {
    const programDiv = document.createElement('div');
    programDiv.className = 'agenda-item';
    programDiv.innerHTML = `
      <h3>${new Date(program.date).toLocaleDateString()}</h3>
      <p>Place: ${program.place}</p>
      <p>Presiding: ${program.presiding}</p>
      <p>Conducting: ${program.conducting}</p>
      <p>Music Conductor: ${program.musicConductor}</p>
      <p>Organist: ${program.organist}</p>
      <p>Opening Prayer: ${program.openingPrayer}</p>
      <p>Closing Prayer: ${program.closingPrayer}</p>
      <h4>Speakers:</h4>
      <ul>
        ${program.speakers.map(speaker => `<li>${speaker.name} - ${speaker.title} (${speaker.duration} mins)</li>`).join('')}
      </ul>
      <h4>Hymns:</h4>
      <ul>
        ${program.hymns.map(hymn => `<li>${hymn.title} (Hymn #${hymn.number})</li>`).join('')}
      </ul>
      <p>Announcements: ${program.announcements}</p>
    `;
    agendaDiv.appendChild(programDiv);
  });
}

function loadCrudForm() {
  const crudSection = document.getElementById('crud-section');
  crudSection.innerHTML = `
    <form id="crud-form" class="crud-form">
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" class="form-control" id="date" required>
      </div>
      <div class="form-group">
        <label for="place">Place</label>
        <input type="text" class="form-control" id="place" required>
      </div>
      <div class="form-group">
        <label for="presiding">Presiding</label>
        <input type="text" class="form-control" id="presiding" required>
      </div>
      <div class="form-group">
        <label for="conducting">Conducting</label>
        <input type="text" class="form-control" id="conducting" required>
      </div>
      <div class="form-group">
        <label for="musicConductor">Music Conductor</label>
        <input type="text" class="form-control" id="musicConductor" required>
      </div>
      <div class="form-group">
        <label for="organist">Organist</label>
        <input type="text" class="form-control" id="organist" required>
      </div>
      <div class="form-group">
        <label for="openingPrayer">Opening Prayer</label>
        <input type="text" class="form-control" id="openingPrayer" required>
      </div>
      <div class="form-group">
        <label for="closingPrayer">Closing Prayer</label>
        <input type="text" class="form-control" id="closingPrayer" required>
      </div>
      <div class="form-group">
        <label for="speakers">Speakers (Comma separated names and titles)</label>
        <input type="text" class="form-control" id="speakers" required>
      </div>
      <div class="form-group">
        <label for="hymns">Hymns (Comma separated titles and numbers)</label>
        <input type="text" class="form-control" id="hymns" required>
      </div>
      <div class="form-group">
        <label for="announcements">Announcements</label>
        <textarea class="form-control" id="announcements" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save Program</button>
    </form>
  `;

  document.getElementById('crud-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;

    const speakers = form.speakers.value.split(',').map(item => {
      const [name, title, duration] = item.trim().split('-');
      return { name: name.trim(), title: title.trim(), duration: Number(duration.trim()) };
    });

    const hymns = form.hymns.value.split(',').map(item => {
      const [title, number] = item.trim().split('-');
      return { title: title.trim(), number: Number(number.trim()) };
    });

    const programData = {
      date: form.date.value,
      place: form.place.value,
      presiding: form.presiding.value,
      conducting: form.conducting.value,
      musicConductor: form.musicConductor.value,
      organist: form.organist.value,
      openingPrayer: form.openingPrayer.value,
      closingPrayer: form.closingPrayer.value,
      speakers,
      hymns,
      announcements: form.announcements.value,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
      });

      if (response.ok) {
        form.reset();
        loadAgenda();
      } else {
        console.error('Failed to save program');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
}
