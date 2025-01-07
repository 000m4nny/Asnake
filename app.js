// Initialize FullCalendar
$(document).ready(function() {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    events: [],
    dayClick: function(date) {
      $('#task-form').show();
      $('#due-date').val(date.format('YYYY-MM-DD'));
    }
  });

  // Handle saving a new task
  $('#save-task').click(function() {
    const subject = $('#subject').val();
    const dueDate = $('#due-date').val();
    const type = $('#type').val();

    const newEvent = {
      title: `${subject} - ${type}`,
      start: dueDate,
      color: '#ff5733',
    };

    $('#calendar').fullCalendar('renderEvent', newEvent, true);
    localStorage.setItem('planner', JSON.stringify($('#calendar').fullCalendar('clientEvents')));
    $('#task-form').hide();
  });

  // Load saved tasks
  const savedTasks = JSON.parse(localStorage.getItem('planner')) || [];
  savedTasks.forEach(task => {
    $('#calendar').fullCalendar('renderEvent', task, true);
  });
});
