let hr = min = sec = mil = "0" + 0;
let hr_set = min_set = sec_set = "0" + 0;
let start_btn = document.querySelector('#start')
let stop_btn = document.querySelector('#stop')
let reset_btn = document.querySelector('#reset')
let setTime_btn = document.querySelector('.time_button')
let ampm = document.querySelector('.am-pm');
let isStopwatch = false;
let isCountdown = false;
let isCurrentTime = false;
let actionBTN = document.querySelectorAll('.action_btn');
let real_time = document.querySelector('.current_time')

let time;
// Its a person that could take a chance on something they were told could never happen, it's a person who can see the bright sides through the dark times when there ain't one, it's when someone who ain't never had nothing ain't afraid to walk away from more profit cause they'd rather do something that they really love than take the pay cut.
const countdown = () => {
    time = setInterval(() => {
        ampm.style.display = 'none'
        mil--;
        if(mil < 0){
            sec_set--;
            mil = 99;
            if(sec_set < 0){
                min_set--;
                sec_set = 59;
                if(min_set < 0){
                    hr_set--;
                    min_set = 59;
                    if (hr_set < 10) {
                        hr_set = "0" + hr_set
                    }
                }
                if (min_set < 10) {
                    min_set = "0" + min_set
                }
            }
            if (sec_set < 10) {
                sec_set = "0" + sec_set
            }
        }
        if (mil < 10 && mil > 0) {
            mil = "0" + mil
        }

        document.querySelector('.millisec').textContent = mil;
        document.querySelector('.sec').textContent = sec_set;
        document.querySelector('.min').textContent = min_set;
        document.querySelector('.hr').textContent = hr_set;
        
        if(mil == 0 && sec_set == 0 && min_set == 0 && hr_set == 0) {
            reset()
            isCountdown = true;
            start_btn.addEventListener('click', function(){
                if(isStopwatch) {
                    start();
                }else if(isCountdown) {
                    countdown();
                }
            }, {once : true})
        }
    }, 10)
}

const start = () => {
    time = setInterval(() => {
        mil++;
        if(mil > 99){
            sec++;
            mil = 0;
            if(sec > 59){
                min++;
                sec = 0;
                if(min > 59){
                    hr++;
                    min = 0;
                    if (hr < 10) {
                        hr = "0" + hr
                    }
                }
                if (min < 10) {
                    min = "0" + min
                }
            }
            if (sec < 10) {
                sec = "0" + sec
            }
        }
        if (mil < 10) {
            mil = "0" + mil
        }

        
        document.querySelector('.millisec').textContent = mil;
        document.querySelector('.sec').textContent = sec;
        document.querySelector('.min').textContent = min;
        document.querySelector('.hr').textContent = hr;
    }, 10);
}

const stop = () => {
    start_btn.classList.remove('active')
    start_btn.classList.add('stopActive')
    clearInterval(time)
}

const reset = () => {
    start_btn.classList.remove('active')
    start_btn.classList.remove('stopActive')
    hr = min = sec = mil = "0" + 0;
    clearInterval(time)
    document.querySelector('.millisec').textContent = mil;
    document.querySelector('.sec').textContent = sec;
    document.querySelector('.min').textContent = min;
    document.querySelector('.hr').textContent = hr;
}

const setCountdown = () => {
    document.querySelector('.am-pm').style.display = 'none'
    hr_set = document.querySelector('#hourSet').value;
    min_set = document.querySelector('#minSet').value;
    sec_set = document.querySelector('#secSet').value

    if (mil < 10) {
        mil = "0" + mil
    }
    if (min_set < 10) {
        min_set = "0" + min_set
    }
    if (sec_set < 10) {
        sec_set = "0" + sec_set
    }
    if (hr_set < 10) {
        hr_set = "0" + hr_set
    }
    document.querySelector('.millisec').textContent = "0" + 0;
    document.querySelector('.sec').textContent = sec_set;
    document.querySelector('.min').textContent = min_set;
    document.querySelector('.hr').textContent = hr_set;
    
}

document.querySelector('.stopwatch').addEventListener('click', function(){
    isStopwatch = true
    isCountdown = false
    isCurrentTime = false
    document.querySelector('.am-pm').style.display = 'none'
    document.querySelector('.stopwatch').style.backgroundColor = 'rgb(163, 73, 248)';

    setTime_btn.style.cursor = 'not-allowed'
    real_time.style.cursor = 'not-allowed'
    
})

setTime_btn.addEventListener('click', function(){
    isStopwatch = false
    isCountdown = true
    isCurrentTime = false
    reset()
    document.querySelector('.setTime').style.display = 'block';
})

real_time.addEventListener('click', function(){
    ampm.style.display = 'inset'
    isStopwatch = false
    isCountdown = false
    isCurrentTime = true
    time = setInterval(() => {
        ampm.style.display = 'inset'
        let date = new Date();
        
        let mil = Math.floor(date.getMilliseconds()/10);
        let sec = date.getSeconds()
        let min = date.getMinutes()
        let hr;
        if(date.getHours() > 12) {
            ampm.textContent = 'pm'
            hr = date.getHours() - 12
        }else {
            ampm.textContent = 'am'
            hr = date.getHours()
        }
        
        document.querySelector('.time').style.display = 'block'

        if(mil < 10) {
            mil = "0" + mil
        }
        if(sec < 10) {
            sec = "0" + sec
        }
        if(min < 10) {
            min = "0" + min
        }
        if(hr < 10) {
            hr = "0" + hr
        }
        document.querySelector('.real_time_hr').textContent = hr;
        document.querySelector('.real_time_min').textContent = min;

        
        document.querySelector('.sec').textContent = sec;
        document.querySelector('.min').textContent = min;
        document.querySelector('.hr').textContent = hr;
    }, 10);
    
})

start_btn.addEventListener('click', function(){
    if(isStopwatch) {
        start();
    }else if(isCountdown) {
        countdown();
    }
}, {once : true})

stop_btn.addEventListener('click', function(){
    if(isStopwatch){
        stop()
    }else if(isCountdown) {
        stop()
    }
    start_btn.addEventListener('click', function(){
        if(isStopwatch) {
            start();
        }else if(isCountdown) {
            countdown();
        }
    }, {once : true})
})
reset_btn.addEventListener('click', function(){
    if(isStopwatch){
        reset()
    }else if(isCountdown) {
        reset()
    }else if(isCurrentTime) {
        reset()
    }
    start_btn.addEventListener('click', start, {once : true})
})

document.querySelector('.apply').addEventListener('click', function(){
    setCountdown();
    document.querySelector('.setTime').style.display = 'none';
    document.querySelectorAll('input').forEach(element => {
        element.value = 0;
    })
})

document.querySelector('.apply').addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        setCountdown();
        document.querySelector('.setTime').style.display = 'none';
        document.querySelectorAll('input').forEach(element => {
            element.value = 0;
        })
    }
})