import $ from 'jquery';
import Rx from 'rxjs/Rx';


const btn = $('#btn');
const input = $('#input');

const btnStream$ =  Rx.Observable.fromEvent(btn,'click');


btnStream$.subscribe(
	function(e) {
		console.log(e.target.innerHTML);
	},
	function(err) {
		console.log(err);
	},	
	function() {
		console.log('Completed');
	}
);

const numbers = [33, 44, 55, 66, 77, 88];
const number$ = Rx.Observable.from(numbers);

number$.subscribe(
	v => {
		console.log(v);
	},
	err => {
		console.log(err);
	},	
	complete => {
		console.log('Completed');
	}
);
 
//const inputStream$ =  Rx.Observable.fromEvent(input,'keyup');
//
// 
//inputStream$.subscribe(
//	function(e) {
//		console.log(e.target.value);
//	},
//	function(err) {
//		console.log(err);
//	},	
//	function() {
//		console.log('Completed');
//	}
//);
//
//const moveStream$ =  Rx.Observable.fromEvent(document,'mousemove');
//
// 
//moveStream$.subscribe(
//	function(e) {
//		console.log(e.target.value);
//		output.append('X : ' + e.clientX + 'Y : ' + e.clientY  );
//	},
//	function(err) {
//		console.log(err);
//	},	
//	function() {
//		console.log('Completed');
//	}
//);
// 


const posts = [
	{title : 'Post 1', body: 'Post one body'},
	{title : 'Post 2', body: 'Post two body'},
	{title : 'Post 3', body: 'Post three body'},
];

//const postOutput = $('#posts');
const posts$ = Rx.Observable.from(posts);

posts$.subscribe(
	post => {
		console.log(post);
		$('#posts').append('<li><h3>' + post.title + '</h3><p>' + post.body + '</p></li>');
	},
	err => {
		console.log(err);
	},	
	complete => {
		console.log('Completed');
	}
);

const source$ = new Rx.Observable(observer => {
	console.log('Creating Observable');
	observer.next('Hello world');
	observer.next('Another value');
	
	observer.error(new Error('Error: something went wrong'));
	
	setTimeout(() => {
		observer.next('Yet another');
		observer.complete();
	},3000)
	
});

source$
.catch(err => Rx.Observable.of(err))
.subscribe(
	x => {
		console.log(x);
	},
	err => {
		console.log(err);
	},	
	complete => {
		console.log('Completed');
	}
);

const myPromise = new Promise((resolve, reject) => {
	console.log('Creating promise');
	setTimeout(() => {
		resolve('Promise successfully resolved');
	}, 3000);
});

//myPromise.then( x => {
//	console.log(x);
//});

const source2$ = Rx.Observable.fromPromise(myPromise);
source2$.subscribe(x => console.log(x));

function getUser(username) {
	return $.ajax({
		url: 'https://api.github.com/users/'+username,
		dataType: 'jsonp'
	}).promise();
}

// bradtraversy

Rx.Observable.fromPromise(getUser('bradtraversy'))  //e.target.value
.map(user => user.data.name)
.subscribe(name =>
	{
		console.log(name);
		
	}
);



//const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup')

/*
inputSource$.subscribe(e => {
	Rx.Observable.fromPromise(getUser(e.target.value))  //e.target.value
	.subscribe(x => {
		console.log(x.data);
		$('#name').text(x.data.name);
		$('#blog').text(x.data.blog);
		$('#repos').text('Public Repos : ' + x.data.public_repos);
	});

});
*/


//const source3$ = Rx.Observable.interval(100).take(5);
//const source3$ = Rx.Observable.timer(5000,2000).take(5);
//const source3$ = Rx.Observable.range(25,32);
//const source3$ = Rx.Observable.interval(100).take(10)
//	.map(v => v * 2);

const source3$ = Rx.Observable.from(['John','Tom','Shawn'])
	.map(v => v.toUpperCase())
	.map(v => 'I am ' + v)
;

source3$.subscribe(
	x => console.log(x),
	err => {
		console.log(err);
	},	
	complete => {
		console.log('Completed');
	}

);

const users = [
	{name:'Will', age:33},
	{name:'Mike', age:34},
	{name:'Paul', age:35},
];

const users$ = Rx.Observable.from(users).pluck('age');

users$.subscribe(x => console.log(x));

Rx.Observable.of('Hello')
	.merge(Rx.Observable.of('Everyone'))
	.subscribe(x => console.log(x))
;


//Rx.Observable.interval(2000)
//	.merge(Rx.Observable.interval(500))
//	.take(10)
//	.subscribe(x => console.log(x))
//;
//	

const source4$ = Rx.Observable.interval(2000).map(v => 'Merge1: ' + v);
const source5$ = Rx.Observable.interval(2000).map(v => 'Merge2: ' + v);

Rx.Observable.merge(source4$, source5$)
	.take(15)
	.subscribe(x => console.log(x))
;

const source6$ = Rx.Observable.range(0,5).map(v => 'Range1: ' + v);
const source7$ = Rx.Observable.range(6,5).map(v => 'Range2: ' + v);


Rx.Observable.concat(source6$, source7$)
	.subscribe(x => console.log(x))
;

Rx.Observable.of('Hello')
	.subscribe(v => {
		Rx.Observable.of(v + 'Everyone')
			.subscribe(x => console.log(v + x));
});

Rx.Observable.of('Hello')
	.mergeMap(v => {
		return Rx.Observable.of(v + 'Everyone')
	})
	.subscribe(x => console.log(x)); // v is not accessible here
;

// bradtraversy


const inputSource2$ = Rx.Observable.fromEvent($('#input'), 'keyup')
	.map(e => e.target.value)
	.switchMap ( v => {
		return Rx.Observable.fromPromise(getUser(v))
	});

inputSource2$.subscribe(x => {
		console.log('**********' + x.data.blog);
		$('#name').text(x.data.name);
		$('#blog').text(x.data.blog);
		$('#repos').text('Public Repos : ' + x.data.public_repos);
	});


