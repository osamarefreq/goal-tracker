
//set #main height to window height and when window is resized set #main height to window height in js

function setHeightById(id) {
    document.getElementById(id).style.height = window.innerHeight + 'px';
}

window.onresize = function () {

};



//loop through all .task
var tasks = document.getElementsByClassName('task');
for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    //get the year and month attributes of the parent node
    var year = task.parentNode.parentNode.getAttribute('year');
    var month = task.parentNode.parentNode.getAttribute('month');
    //get the input and progress elements within the task element
    var input = task.getElementsByClassName('v')[0];
    var progress = task.getElementsByClassName('progress')[0];
    var child = progress.children[0];

    //check if local storage has a value for the input id and if it does set the value of the input to the value in local storage
    if (localStorage.getItem(input.id + '-' + year + '-' + month) != null) {
        input.value = parseInt(localStorage.getItem(input.id + '-' + year + '-' + month));
        child.style.width = input.value + '%';
    } else {
        localStorage.setItem(input.id + '-' + year + '-' + month, 0);
    }
}

document.querySelectorAll('.increase').forEach(function (div) {
    var year;
    var month;
    //year is parent scene year attribute
    year = div.parentNode.parentNode.parentNode.parentNode.getAttribute('year');
    //month is parent scene month attribute
    month = div.parentNode.parentNode.parentNode.parentNode.getAttribute('month');
    div.addEventListener('click', function () {
        var input = this.parentNode.parentNode.getElementsByClassName('v')[0];
        var progress = this.parentNode.parentNode.getElementsByClassName('progress')[0];
        //get child of progress bar
        input.value = parseInt(localStorage.getItem(input.id + '-' + year + '-' + month));
        if (input.value >= 100) {
            return;
        }
        var child = progress.children[0];
        var width = parseInt(input.value);
        child.style.width = width + 10 + '%';
        width = parseInt(child.style.width);
        input.value = parseInt(child.style.width);
        localStorage.setItem(input.id + '-' + year + '-' + month, child.style.width);
    });
});

//loop through all .decrease then get the value of the progress bar and decrease it by 10 then save the value to local storage
document.querySelectorAll('.decrease').forEach(function (div) {
    var year;
    var month;
    //year is parent scene year attribute
    year =  div.parentNode.parentNode.parentNode.parentNode.getAttribute('year');   
    //month is parent scene month attribute
    month =  div.parentNode.parentNode.parentNode.parentNode.getAttribute('month');
    div.addEventListener('click', function () {
        var input = this.parentNode.parentNode.getElementsByClassName('v')[0];
        var progress = this.parentNode.parentNode.getElementsByClassName('progress')[0];
        //get child of progress bar
        input.value = parseInt(localStorage.getItem(input.id + '-' + year + '-' + month));

        //prevent the progress bar from going below 0
        if (input.value <= 0) {
            return;
        }
        var child = progress.children[0];
        var width = parseInt(input.value);
        child.style.width = width - 10 + '%';
        width = parseInt(child.style.width);
        input.value = parseInt(child.style.width);
        localStorage.setItem(input.id + '-' + year + '-' + month, child.style.width);
    });
});



//on click to .content covert to .content-editable
document.querySelectorAll('.content-input').forEach(function (div) {
    div.addEventListener('click', function () {
        // Create an input element
        var input = this;
        input.readOnly = false;
        input.foucs = true;


        window.addEventListener('click', function (e) {
            if (e.target != input) {
                input.readOnly = true;
            }
        });
    });
});

//when the input is changed save the value to local storage
document.querySelectorAll('.content-input').forEach(function (div) {
    var year;
    var month;
    //year is parent scene year attribute
    year = div.parentNode.parentNode.parentNode.getAttribute('year');
    //month is parent scene month attribute
    month = div.parentNode.parentNode.parentNode.getAttribute('month');

    var mainHiddenInput = div.parentNode.getElementsByClassName('v')[0];

    var id = mainHiddenInput.id;
    div.value = localStorage.getItem(id + '-' + year + '-' + month + 'c');
    div.addEventListener('change', function () {
        localStorage.setItem(id + '-' + year + '-' + month + 'c', div.value);
    });
});

document.querySelectorAll('.target_money').forEach(function (div) {
    var year;
    var month;
    //year is parent scene year attribute
    year = div.parentNode.parentNode.getAttribute('year');
    //month is parent scene month attribute
    month = div.parentNode.parentNode.getAttribute('month');

    //check if div has a value in local storage if it does set the value of the div to the value in local storage
    if (localStorage.getItem('target_money' + '-' + year + '-' + month) != null) {
        div.value = parseInt(localStorage.getItem('target_money' + '-' + year + '-' + month));
    } else {
        localStorage.setItem('target_money' + '-' + year + '-' + month, 0);
        div.value = 0;
    }
    //when the input is changed save the value to local storage
    div.addEventListener('change', function () {
        localStorage.setItem('target_money' + '-' + year + '-' + month, div.value);
    }
    );
});
//.collected
document.querySelectorAll('.collected').forEach(function (div) {
    var year;
    var month;
    //year is parent scene year attribute
    year = div.parentNode.parentNode.getAttribute('year');
    //month is parent scene month attribute
    month = div.parentNode.parentNode.getAttribute('month');

    //check if div has a value in local storage if it does set the value of the div to the value in local storage
    if (localStorage.getItem('collected' + '-' + year + '-' + month) != null) {
        div.value = parseInt(localStorage.getItem('collected' + '-' + year + '-' + month));
    } else {
        localStorage.setItem('collected' + '-' + year + '-' + month, 0);
        div.value = 0;
    }
    //when the input is changed save the value to local storage
    div.addEventListener('change', function () {
        localStorage.setItem('collected' + '-' + year + '-' + month, div.value);
    }
    );
});


//.year
document.querySelectorAll('.year').forEach(function (div) {
    //check if div has a value in local storage if it does set the value of the div to the value in local storage
    var year = Date().slice(11, 15);
    if (localStorage.getItem('year') != null) {
        div.value = parseInt(localStorage.getItem('year'));
    } else {
        localStorage.setItem('year', year);
        div.value = year;
    }
    //when the input is changed save the value to local storage
    div.addEventListener('change', function () {
        localStorage.setItem('year', div.value);
    });

});

//.month
document.querySelectorAll('.month').forEach(function (div) {

    //log month name
    var month = Date().slice(4, 7);
    if (localStorage.getItem('month') != null) {
        div.value = localStorage.getItem('month');
    } else {
        localStorage.setItem('month', month);
        div.value = month;
    }
    //when the input is changed save the value to local storage
    div.addEventListener('change', function () {
        localStorage.setItem('month', div.value);
    });

}
);

//.resetButton click event
document.querySelectorAll('.resetButton').forEach(function (div) {
    div.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });
});



document.querySelectorAll('.share').forEach(function (div) {
    div.addEventListener('click', function () {
        Swal.fire({
            title: 'Share this tool',
            text: "This tool is free to use and share. Please share it with your friends and family. and help us to make it better.",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Copy'
          }).then((result) => {
            if (result.value) {
              // Copy the URL to the clipboard
              navigator.clipboard.writeText(location.href);
          
              // Show a message to confirm that the URL was copied
              Swal.fire(
                'Copied!',
                'The URL has been copied to your clipboard.',
                'success'
              );
            }
          });
    });
}
);
