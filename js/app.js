(function () {
   "use strict";
   // Get HTML elements
   const form = document.querySelector("#todo-form");
   const input = document.querySelector("#todo-input");
   const list = document.querySelector("#todo-list");
   const errorMsg = document.querySelector("#error-msg");
   const counter = document.querySelector("#counter");
   const filterAll = document.querySelector("#filter-all");
   const filterActive = document.querySelector("#filter-active");
   const filterDone = document.querySelector("#filter-done");
   let currentFilter = "all";
   // Update the counter
   function updateCounter() {
       const items = list.querySelectorAll("li");
       let remaining = 0;
       items.forEach(function (item) {
           if (!item.classList.contains("completed")) {
               remaining++;
           }
       });
       counter.textContent =
           remaining + " item" + (remaining === 1 ? "" : "s") + " left";
   }
   // Apply the selected filter
   function applyFilter() {
       const items = list.querySelectorAll("li");
       items.forEach(function (item) {
           const isCompleted = item.classList.contains("completed");
           if (currentFilter === "all") {
               item.style.display = "";
           } else if (currentFilter === "active") {
               item.style.display = isCompleted ? "none" : "";
           } else if (currentFilter === "done") {
               item.style.display = isCompleted ? "" : "none";
           }
       });
   }
   // Add a new item
   form.addEventListener("submit", function (event) {
       event.preventDefault();
       const taskText = input.value.trim();
       if (taskText === "") {
           errorMsg.classList.remove("hidden");
           return;
       }
       errorMsg.classList.add("hidden");
       const li = document.createElement("li");
       const span = document.createElement("span");
       span.className = "item-text";
       span.textContent = taskText;
       const deleteBtn = document.createElement("button");
       deleteBtn.type = "button";
       deleteBtn.className = "delete-btn";
       deleteBtn.textContent = "Delete";
       li.appendChild(span);
       li.appendChild(deleteBtn);
       list.appendChild(li);
       input.value = "";
       applyFilter();
       updateCounter();
   });
   // Event delegation for toggle and delete
   list.addEventListener("click", function (event) {
       const target = event.target;
       const li = target.closest("li");
       if (!li || !list.contains(li)) {
           return;
       }
       if (target.classList.contains("delete-btn")) {
           li.remove();
       } else if (target.classList.contains("item-text")) {
           li.classList.toggle("completed");
       }
       applyFilter();
       updateCounter();
   });
   // Show all items
   filterAll.addEventListener("click", function () {
       currentFilter = "all";
       applyFilter();
   });
   // Show active items
   filterActive.addEventListener("click", function () {
       currentFilter = "active";
       applyFilter();
   });
   // Show completed items
   filterDone.addEventListener("click", function () {
       currentFilter = "done";
       applyFilter();
   });
   // Initial counter
   updateCounter();
})();