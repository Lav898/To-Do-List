const input = document.getElementById("input-box");
    const listcontainer = document.getElementById("list-container");

    function AddFunc() {
      if (input.value === '') {
        alert("Enter some text to add into todo list");
      } else {
        let li = document.createElement('li');
        li.innerHTML = input.value;

        // Toggle complete on click
        li.onclick = function () {
          li.classList.toggle("completed");
          save();
        };

        // Add delete button
        let span = document.createElement('span');
        span.innerHTML = '&#10006;';
        span.onclick = function (e) {
          e.stopPropagation(); // prevent li click
          li.remove();
          save();
        };

        li.appendChild(span);
        listcontainer.appendChild(li);
        input.value = '';
        save();
      }
    }
    function clearAll() {
        listcontainer.innerHTML = "";
        localStorage.removeItem("tasks");
      }
    // Save list to localStorage
    function save() {
      localStorage.setItem("tasks", listcontainer.innerHTML);
    }

    // Load saved list
    function loadTasks() {
      listcontainer.innerHTML = localStorage.getItem("tasks");
      // Reattach events after loading
      Array.from(listcontainer.children).forEach((li) => {
        li.onclick = function () {
          li.classList.toggle("completed");
          save();
        };
        li.querySelector("span").onclick = function (e) {
          e.stopPropagation();
          li.remove();
          save();
        };
        
      });
    }

    loadTasks(); // Load when page opens