
	var video1,video2,mp4_1,mp4_2;
	var audio,audioQ;
	
	var video1_faded = false,audio_muted = false;
	var currentMainVideo;
	var src,audio_src;
	var state = 0; 
	
	var can_Fclick = false,can_Cclick = true;
	
	var player = 
	{
    C:0,
    F:0,
    S:0,
    M:0
	};
	
	var playerPercentage = { C:0,F:0,S:0,M:0 },total;
	
	var data =
	[
	{
	"Q": "You see a man leaving his phone on a bench. What would you do ?",
	"C": "Steal it !",
	"F": "Continue your way careless.",
	"S": "Run to him and give it back.",
	"M": ""
	}, //0
	{
	"Q": "Out of nowhere, a pretty girl starts a conversation with you. What would you say ?",
	"C": "Better than you think ! And you ?",
	"F": "...aghm...(shy)",
	"S": "Quite good.",
	"M": "Ok, I suppose...you ?"
	}, // 1
	{
	"Q": "You come to this new pub and see that it is a very noisy rock pub. Which is your reaction ?",
	"C": "Mmh...Alright.",
	"F": "I'm not going in there.",
	"S": "",
	"M": "What is this ? Ok let's see."
	}, // 2
	{
	"Q": "Out of nowhere, a man runs into you in the street. What do you say ?",
	"C": "What the fuck is wrong with you ?",
	"F": "No problem, man.",
	"S": "",
	"M": "Woho, easy my friend.....*aghm idiot*."
	}, // 3
	{
	"Q": "You are explaining something to a person and the person doesn't understand. How do you react ?",
	"C": "Is that simple. How can't you understand ?!",
	"F": "Okay, let me repeat the idea.",
	"S": "Alright. Let's think this in another way !",
	"M": "I'm disappointed...is to easy to understand this."
	}, // 4
	{
	"Q": "Your boss is asking you for the state of your unfinished project. What would you say ?",
	"C": "Of course I did and it looks amazing !",
	"F": "I'm almost ready. Ammm, can I have two more hours ?",
	"S": "Yes, I did. But, just to know, it's not very impressive.",
	"M": "Oh no...I will clearly need more time, but I promise I'll do it."
	} // 5
	];
	
    $(document).ready(function()
	{
		//showPlayerScore();
		document.oncontextmenu = function() {return false;};
		video1 = document.getElementById("bg_video");
		video2 = document.getElementById("bg_video2");
		mp4_1 = document.getElementById("mp4_1");
		mp4_2 = document.getElementById("mp4_2");
		
		video1.muted = true;
		video2.muted = true;
	
		$("#bg_video2").addClass("faded");
		$(".videoContainer").addClass("blur");
		$(".videoContainer").addClass("Fclick");
		
		src = "video/INTRO.mp4";
		video1.loop = true;
		playVideo1();
		
		video1.addEventListener('ended',video_ended,false);
		video2.addEventListener('ended',video_ended,false);
		
		$('body').fadeIn(1100, function() 
		{
			$("#centeredLogo").addClass("active");
			can_Fclick = true;
		});
	
		$("#centerH").click(function()
		{
			location.reload();
		});
		$("#fb").click(function()
		{
			window.open("https://www.facebook.com/pk.razby");
		});
		$("#git").click(function()
		{
			window.open("https://github.com/Cursi/Tempera");
		});
		$("#music").click(function()
		{
			muteAudio();
		});
		$("#3d").click(function()
		{
			audio_src = "audio/3d.mp3";
			playAudio();
		});
		
		$(".Fclick").click(function()
		{
			if (can_Fclick)
			{
					can_Fclick = false;
					state = 1;
					$(".videoContainer").removeClass("blur");
					$(".videoContainer").removeClass("Fclick");
					$("#centeredLogo").removeClass("active");
					
					video1_faded = true;
					video1.loop = false;
					video1.pause();
					video1.muted = false;
					video2.muted = false;
					
					audio_src = "audio/fx.mp3";
					playAudio();
					
					$("#bg_video").addClass("faded");
					currentMainVideo = 0;
					src = "video/" + currentMainVideo + "/MAIN2.mp4";
					
					setTimeout(function() 
					{
						playVideo2();
						$("header").css("background-color","rgba(0,0,0,0.6)");
						$("#bg_video2").removeClass("faded");
					},1300);		
					//alert("You clicked anywhere, but Cursi is lazy.");				
			}
		});
		
		$("#C").click(function()
		{
			if (can_Cclick)
			{
				player.C++;
				if (currentMainVideo == 2) player.S++;
				src = "video/" + currentMainVideo + "/C.mp4";
				ChoiceClicked();
				can_Cclick = false;
				audioQ.pause();
			}
		});
		$("#F").click(function()
		{
			if (can_Cclick)
			{
				player.F++;
				if (currentMainVideo == 0) player.M++;
				if (currentMainVideo == 3) player.S++;
				src = "video/" + currentMainVideo + "/F.mp4";
				ChoiceClicked();
				can_Cclick = false;
				audioQ.pause();
			}
		});
		$("#S").click(function()
		{
			if (can_Cclick)
			{
				player.S++;
				src = "video/" + currentMainVideo + "/S.mp4";
				ChoiceClicked();
				can_Cclick = false;
				audioQ.pause();
			}
		});
		$("#M").click(function()
		{
			if (can_Cclick)
			{
				player.M++;
				src = "video/" + currentMainVideo + "/M.mp4";
				ChoiceClicked();
				can_Cclick = false;
				audioQ.pause();
			}
		});
					
					$(document).on('click', '#C_proc', 
					function (event) 
					{
						$("#infoLoad").load("info/C.html");
						infoLoad();
					});
					$(document).on('click', '#S_proc', 
					function (event) 
					{
						$("#infoLoad").load("info/S.html");
						infoLoad();
					});
					$(document).on('click', '#F_proc', 
					function (event) 
					{
						$("#infoLoad").load("info/F.html");
						infoLoad();
					});
					$(document).on('click', '#M_proc', 
					function (event) 
					{
						$("#infoLoad").load("info/M.html");
						infoLoad();
					});
					//------------------------------------------
					$(document).on('click', '.pie_C', 
					function (event) 
					{
						$("#infoLoad").load("info/C.html");
						infoLoad();
					});
					$(document).on('click', '.pie_S', 
					function (event) 
					{
						$("#infoLoad").load("info/S.html");
						infoLoad();
					});
					$(document).on('click', '.pie_F', 
					function (event) 
					{
						$("#infoLoad").load("info/F.html");
						infoLoad();
					});
					$(document).on('click', '.pie_M', 
					function (event) 
					{
						$("#infoLoad").load("info/M.html");
						infoLoad();
					});
					//------------------------------------------
					$(document).on('click', '#arrow', 
					function (event) 
					{
						audio_src = "audio/fx.mp3";
						playAudio();
						$("#resultContainer").addClass("active");
						$(".ct-chart").addClass("rotated");
						$("#infoContainer").removeClass("active");
					});
	});
	
	function infoLoad()
	{
		audio_src = "audio/fx.mp3";
		playAudio();
		$("#resultContainer").removeClass("active");
		$(".ct-chart").removeClass("rotated");
		$("#infoContainer").addClass("active");
	}
	
	function video_ended(e) 
	{
		if (state == 1)
		{
			$("#Q").text(data[currentMainVideo]["Q"]);
			$("#C").text(data[currentMainVideo]["C"]);
			$("#F").text(data[currentMainVideo]["F"]);
			$("#S").text(data[currentMainVideo]["S"]);
			$("#M").text(data[currentMainVideo]["M"]);
			
			if (currentMainVideo == 0) $("#M").addClass("hide");
			if (currentMainVideo == 2 || currentMainVideo == 3) $("#S").addClass("hide"); // particularitati
			
			audio_src = "audio/Q/" +currentMainVideo + ".mp3";
			setTimeout(function() { playAudio(); },500);
			RandomizeChoices();
			
			$("#choiceContainer").addClass("active");
			$(".videoContainer").addClass("blur");
		}
		if (state == 2)
		{
			if (currentMainVideo != 5)
			{
				audio_src = "audio/fx.mp3";
				playAudio();
				currentMainVideo++;
				src = "video/" + currentMainVideo + "/MAIN2.mp4";
				
				if (video1_faded)
				{
					//alert("2 ended.");
					video1_faded = false;
					$("#bg_video2").addClass("faded");
					setTimeout(function() 
						{
							playVideo1();
							$("#bg_video").removeClass("faded");	
						},1300);	
				}
				else 
				{
					//alert("1 ended.");
					video1_faded = true;
					$("#bg_video").addClass("faded");
					setTimeout(function() 
						{
							playVideo2();
							$("#bg_video2").removeClass("faded");	
						},1300);
				}
				state = 1;
			}
			else 
			{
				$(".videoContainer").addClass("blur");
				audio_src = "audio/fx.mp3";
				playAudio();
				audio_src = "audio/end.mp3";
				playAudio();
				$("header").css("background-color","rgba(255,255,255,0.15)");
				CalculatePlayerPercentage();
				MakePie();
				$("#resultContainer").addClass("active");
				$(".ct-chart").addClass("rotated");
				//alert('Cursi said: "End of story."' + "Your temperament is: C:" + playerPercentage.C + "%, F:" + playerPercentage.F + "%, S:" + playerPercentage.S + "%, M:" + playerPercentage.M + "%." );
			}
			// load a main
		}
    }		

	function MakePie()
	{
		new Chartist.Pie('.ct-chart', 
		{
		  series: 
		   [{
			  value: playerPercentage.C,
			  className: "pie_C"
			},
			{
			  value: playerPercentage.S,
			  className: "pie_S"
			},
			{
			  value: playerPercentage.F,
			  className: "pie_F"
			},
			{
			  value: playerPercentage.M,
			  className: "pie_M"
		    }]
		}, 
		{
		  donut: true,
		  donutWidth: 80,
		  startAngle: 0,
		  total: 100,
		  showLabel: false
		});
		
		$("#C_proc").append(" (" + playerPercentage.C + "%)");
		$("#S_proc").append(" (" + playerPercentage.S + "%)");
		$("#F_proc").append(" (" + playerPercentage.F + "%)");
		$("#M_proc").append(" (" + playerPercentage.M + "%)");
	}
	
	function CalculatePlayerPercentage()
	{
		total = player.C + player.F + player.S + player.M;
		playerPercentage.C = Math.round((player.C*1000) / total) / 10;
		playerPercentage.F = Math.round((player.F*1000) / total) / 10;
		playerPercentage.S = Math.round((player.S*1000) / total) / 10;
		playerPercentage.M = Math.round((player.M*1000) / total) / 10;
	}
	
	function ChoiceClicked()
	{
		audio_src = "audio/fx.mp3";
		playAudio();
	
		$("#choiceContainer").removeClass("active");
		$(".videoContainer").removeClass("blur");
		
			if (video1_faded)
			{
				//alert("2 ended.");
				video1_faded = false;
				$("#bg_video2").addClass("faded");
				playVideo1();
				setTimeout(function() 
					{
						RemoveParticularities();
						can_Cclick = true;
						$("#bg_video").removeClass("faded");	
					},400);	
			}
			else 
			{
				//alert("1 ended.");
				video1_faded = true;
				$("#bg_video").addClass("faded");
				playVideo2();
				setTimeout(function() 
					{
						RemoveParticularities();
						$("#bg_video2").removeClass("faded");
					},400);						
			}
			state = 2;
			//showPlayerScore();
	}
	
	function RemoveParticularities()
	{
		$("#C").removeClass("hide");
		$("#F").removeClass("hide");
		$("#S").removeClass("hide");
		$("#M").removeClass("hide");
	}
	
	function RandomizeChoices()
	{
		var cards = $(".choice");
			for(var i = 0; i < cards.length; i++)
			{
				var target = Math.floor(Math.random() * cards.length -1) + 1;
				var target2 = Math.floor(Math.random() * cards.length -1) +1;
				cards.eq(target).before(cards.eq(target2));
			}
	}
	
	function muteAudio()
	{
		if (audio_muted)
		{
			$("#music").attr('src',"img/msc1.png");
			video1.volume = 1;
			video2.volume = 1;
			try { audio.volume = 1; audioQ.volume = 1; } catch(err) {}
			audio_muted = false;
		}
		else
		{
			$("#music").attr('src',"img/msc2.png");
			if(!video1.muted && !video2.muted)
			{
				video1.volume = 0;
				video2.volume = 0;
			}
			try { audio.volume = 0; audioQ.volume = 0; } catch(err) {}
			audio_muted = true;
		}
	}
	function playAudio()
	{
		if (audio_src.indexOf("Q") > -1) 
		{
			audioQ = new Audio(audio_src);
			audioQ.play();
		}
		else 
		{
			audio = new Audio(audio_src);
			audio.play();
		}
		if (audio_muted) 
		{
			if (audio_src.indexOf("Q") > -1) audioQ.volume = 0;
			else audio.volume = 0;
		}
	}
	function playVideo1()
	{
		mp4_1.src = src;
		video1.load();
		video1.play();
		if (audio_muted) video1.volume = 0;
	}
	function playVideo2()
	{
		mp4_2.src = src;
		video2.load();
		video2.play();
		if (audio_muted) video2.volume = 0;
	}
	
	function showPlayerScore()
	{
		console.log(player);
	}