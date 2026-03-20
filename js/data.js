// ===== Reading Tutor Content Data =====
// Section 01: Nature, Body, Animals

export const CONTENT_DATA = {
  sections: [
    {
      id: 'section-01',
      title: 'Section 01',
      theme: 'Nature · Body · Animals',
      emoji: '🌿',
      color: '#4ECDC4',
      readings: [
        {
          id: 'r01-01',
          sectionId: 'section-01',
          title: 'What am I?',
          category: 'Nature',
          emoji: '💧',
          vocabulary: [
            { word: 'human', meaning: '사람, 인간', ipa: '/hjuːmən/', image: '🧑', phonics: ['h','u','m','a','n'] },
            { word: 'animal', meaning: '동물', ipa: '/ǽnɪməl/', image: '🐾', phonics: ['a','n','i','m','a','l'] },
            { word: 'plant', meaning: '식물', ipa: '/plænt/', image: '🌱', phonics: ['p','l','a','n','t'] },
            { word: 'color', meaning: '색깔', ipa: '/kʌ́lər/', image: '🎨', phonics: ['c','o','l','o','r'] },
            { word: 'shape', meaning: '모양', ipa: '/ʃeɪp/', image: '🔷', phonics: ['s','h','a','p','e'] },
            { word: 'sea', meaning: '바다', ipa: '/siː/', image: '🌊', phonics: ['s','e','a'] },
            { word: 'river', meaning: '강', ipa: '/rɪ́vər/', image: '🏞️', phonics: ['r','i','v','e','r'] },
            { word: 'lake', meaning: '호수', ipa: '/leɪk/', image: '🏔️', phonics: ['l','a','k','e'] },
            { word: 'hardly', meaning: '거의 ~않다', ipa: '/hɑ́ːrdli/', image: '🤏', phonics: ['h','a','r','d','l','y']},
            { word: 'desert', meaning: '사막', ipa: '/dézərt/', image: '🏜️', phonics: ['d','e','s','e','r','t'] },
            { word: 'strong', meaning: '강한', ipa: '/strɔːŋ/', image: '💪', phonics: ['s','t','r','o','n','g'] },
            { word: 'cut', meaning: '자르다', ipa: '/kʌt/', image: '✂️', phonics: ['c','u','t'] },
            { word: 'weak', meaning: '약한', ipa: '/wiːk/', image: '😥', phonics: ['w','e','a','k'] },
            { word: 'wind', meaning: '바람', ipa: '/wɪnd/', image: '💨', phonics: ['w','i','n','d'] },
            { word: 'move', meaning: '움직이다', ipa: '/muːv/', image: '➡️', phonics: ['m','o','v','e'] },
            { word: 'need', meaning: '필요하다', ipa: '/niːd/', image: '🙏', phonics: ['n','e','e','d'] },
          ],
          passage: [
            { en: 'I am not a human.', ko: '나는 사람이 아니야.' },
            { en: 'I am not an animal.', ko: '나는 동물이 아니야.' },
            { en: 'I am not a plant.', ko: '나는 식물이 아니야.' },
            { en: "I don't have colors.", ko: '나는 색깔이 없어.' },
            { en: "I don't have a shape.", ko: '나는 모양이 없어.' },
            { en: 'You can see me in the sea.', ko: '너는 바다에서 나를 볼 수 있어.' },
            { en: 'You can see me in rivers.', ko: '너는 강에서 나를 볼 수 있어.' },
            { en: 'You can see me in lakes.', ko: '너는 호수에서 나를 볼 수 있어.' },
            { en: 'You can hardly see me in the desert.', ko: '사막에서는 나를 거의 볼 수 없어.' },
            { en: 'I am strong.', ko: '나는 강해.' },
            { en: "You can't cut me.", ko: '너는 나를 자를 수 없어.' },
            { en: 'I am weak.', ko: '나는 약해.' },
            { en: 'The wind can move me.', ko: '바람이 나를 움직일 수 있어.' },
            { en: 'You need me.', ko: '너는 내가 필요해.' },
            { en: "I don't need you.", ko: '나는 네가 필요 없어.' },
            { en: 'What am I?', ko: '나는 무엇일까?' },
          ],
          questions: [
            {
              text: '이 글의 정답은 무엇일까요?',
              type: 'main-idea',
              choices: ['불 (Fire)', '물 (Water)', '공기 (Air)', '흙 (Earth)'],
              answer: 1,
              hint: '"바다, 강, 호수에서 볼 수 있다"는 문장을 다시 읽어보세요.',
              excerpt: 'You can see me in the sea. You can see me in rivers. You can see me in lakes.'
            },
            {
              text: '"I am strong"은 무슨 뜻일까요?',
              type: 'vocabulary',
              choices: ['나는 크다', '나는 강하다', '나는 빠르다', '나는 무겁다'],
              answer: 1,
              hint: 'strong은 "힘이 센, 강한"이라는 뜻이에요.',
              excerpt: 'I am strong. You can\'t cut me.'
            },
            {
              text: '사막에서 나를 볼 수 있을까요?',
              type: 'detail',
              choices: ['네, 많이 볼 수 있어요', '조금 볼 수 있어요', '거의 볼 수 없어요', '전혀 볼 수 없어요'],
              answer: 2,
              hint: '"hardly"는 "거의 ~않다"라는 뜻이에요. 그 문장을 다시 읽어보세요.',
              excerpt: 'You can hardly see me in the desert.'
            },
            {
              text: '무엇이 나를 움직일 수 있나요?',
              type: 'detail',
              choices: ['사람 (Human)', '동물 (Animal)', '바람 (Wind)', '식물 (Plant)'],
              answer: 2,
              hint: '"The wind can move me" 문장을 확인해보세요.',
              excerpt: 'The wind can move me.'
            },
          ],
          sentenceBuilding: [
            { words: ['You', 'can', 'see', 'me', 'in', 'the', 'sea.'], ko: '너는 바다에서 나를 볼 수 있어.' },
            { words: ['I', 'am', 'not', 'a', 'human.'], ko: '나는 사람이 아니야.' },
            { words: ['The', 'wind', 'can', 'move', 'me.'], ko: '바람이 나를 움직일 수 있어.' },
            { words: ['You', 'need', 'me.'], ko: '너는 내가 필요해.' },
          ]
        },
        {
          id: 'r01-02',
          sectionId: 'section-01',
          title: 'Senses',
          category: 'Body',
          emoji: '👁️',
          vocabulary: [
            { word: 'sense', meaning: '감각', ipa: '/sens/', image: '🧠', phonics: ['s','e','n','s','e'] },
            { word: 'sight', meaning: '시각', ipa: '/saɪt/', image: '👀', phonics: ['s','i','g','h','t'] },
            { word: 'hearing', meaning: '청각', ipa: '/hɪ́ərɪŋ/', image: '👂', phonics: ['h','e','a','r','i','n','g'] },
            { word: 'taste', meaning: '미각, 맛보다', ipa: '/teɪst/', image: '👅', phonics: ['t','a','s','t','e'] },
            { word: 'touch', meaning: '촉각, 만지다', ipa: '/tʌtʃ/', image: '🤚', phonics: ['t','o','u','c','h'] },
            { word: 'smell', meaning: '후각, 냄새 맡다', ipa: '/smel/', image: '👃', phonics: ['s','m','e','l','l'] },
            { word: 'eye', meaning: '눈', ipa: '/aɪ/', image: '👁️', phonics: ['e','y','e'] },
            { word: 'help', meaning: '돕다', ipa: '/help/', image: '🤝', phonics: ['h','e','l','p'] },
            { word: 'ear', meaning: '귀', ipa: '/ɪər/', image: '👂', phonics: ['e','a','r'] },
            { word: 'hear', meaning: '듣다', ipa: '/hɪər/', image: '🎵', phonics: ['h','e','a','r'] },
            { word: 'music', meaning: '음악', ipa: '/mjúːzɪk/', image: '🎶', phonics: ['m','u','s','i','c'] },
            { word: 'tongue', meaning: '혀', ipa: '/tʌŋ/', image: '👅', phonics: ['t','o','n','g','u','e'] },
            { word: 'food', meaning: '음식', ipa: '/fuːd/', image: '🍕', phonics: ['f','o','o','d'] },
            { word: 'sweet', meaning: '달콤한', ipa: '/swiːt/', image: '🍬', phonics: ['s','w','e','e','t'] },
            { word: 'chocolate', meaning: '초콜릿', ipa: '/tʃɑ́ːklət/', image: '🍫', phonics: ['c','h','o','c','o','l','a','t','e'] },
            { word: 'skin', meaning: '피부', ipa: '/skɪn/', image: '🤲', phonics: ['s','k','i','n'] },
            { word: 'feel', meaning: '느끼다', ipa: '/fiːl/', image: '💗', phonics: ['f','e','e','l'] },
            { word: 'puppy', meaning: '강아지', ipa: '/pʌ́pi/', image: '🐶', phonics: ['p','u','p','p','y'] },
            { word: 'fur', meaning: '털', ipa: '/fɜːr/', image: '🧸', phonics: ['f','u','r'] },
            { word: 'nose', meaning: '코', ipa: '/noʊz/', image: '👃', phonics: ['n','o','s','e'] },
            { word: 'flower', meaning: '꽃', ipa: '/fláʊər/', image: '🌸', phonics: ['f','l','o','w','e','r'] },
            { word: 'learn', meaning: '배우다', ipa: '/lɜːrn/', image: '📚', phonics: ['l','e','a','r','n'] },
            { word: 'new', meaning: '새로운', ipa: '/njuː/', image: '✨', phonics: ['n','e','w'] },
          ],
          passage: [
            { en: 'We have five senses.', ko: '우리에게는 다섯 가지 감각이 있어요.' },
            { en: 'They are sight, hearing, taste, touch, and smell.', ko: '시각, 청각, 미각, 촉각, 그리고 후각이에요.' },
            { en: 'Our eyes help us see things.', ko: '우리의 눈은 사물을 보는 것을 도와줘요.' },
            { en: 'We see colors with our eyes.', ko: '우리는 눈으로 색깔을 봐요.' },
            { en: 'Our ears help us hear things.', ko: '우리의 귀는 소리를 듣는 것을 도와줘요.' },
            { en: 'We hear music with our ears.', ko: '우리는 귀로 음악을 들어요.' },
            { en: 'Our tongue helps us taste food.', ko: '우리의 혀는 음식의 맛을 보는 것을 도와줘요.' },
            { en: 'We taste sweet chocolate with our tongue.', ko: '우리는 혀로 달콤한 초콜릿의 맛을 봐요.' },
            { en: 'Our skin helps us feel things.', ko: '우리의 피부는 사물을 느끼는 것을 도와줘요.' },
            { en: "We feel puppies' fur with our skin.", ko: '우리는 피부로 강아지의 털을 느껴요.' },
            { en: 'Our nose helps us smell things.', ko: '우리의 코는 냄새를 맡는 것을 도와줘요.' },
            { en: 'We smell flowers with our nose.', ko: '우리는 코로 꽃 냄새를 맡아요.' },
            { en: 'We learn new things with our senses.', ko: '우리는 감각으로 새로운 것들을 배워요.' },
          ],
          questions: [
            {
              text: '우리에게는 몇 가지 감각이 있나요?',
              type: 'detail',
              choices: ['3가지', '4가지', '5가지', '6가지'],
              answer: 2,
              hint: '첫 번째 문장을 다시 읽어보세요: "We have five senses."',
              excerpt: 'We have five senses.'
            },
            {
              text: '우리는 무엇으로 음악을 듣나요?',
              type: 'detail',
              choices: ['눈 (eyes)', '귀 (ears)', '코 (nose)', '혀 (tongue)'],
              answer: 1,
              hint: '"hear"라는 단어가 나오는 문장을 찾아보세요.',
              excerpt: 'We hear music with our ears.'
            },
            {
              text: '우리가 혀로 맛보는 것은 무엇인가요?',
              type: 'detail',
              choices: ['꽃 (flowers)', '음악 (music)', '달콤한 초콜릿 (sweet chocolate)', '강아지 털 (fur)'],
              answer: 2,
              hint: '"tongue"과 "taste"가 나오는 문장을 확인해보세요.',
              excerpt: 'We taste sweet chocolate with our tongue.'
            },
            {
              text: '이 글은 주로 무엇에 대한 이야기인가요?',
              type: 'main-idea',
              choices: ['동물에 대해', '음식에 대해', '다섯 가지 감각에 대해', '학교에 대해'],
              answer: 2,
              hint: '글의 첫 문장과 마지막 문장을 다시 읽어보세요.',
              excerpt: 'We have five senses. ... We learn new things with our senses.'
            },
          ],
          sentenceBuilding: [
            { words: ['Our', 'tongue', 'helps', 'us', 'taste', 'food.'], ko: '우리의 혀는 음식의 맛을 보는 것을 도와줘요.' },
            { words: ['We', 'learn', 'new', 'things', 'with', 'our', 'senses.'], ko: '우리는 감각으로 새로운 것들을 배워요.' },
            { words: ['Our', 'eyes', 'help', 'us', 'see', 'things.'], ko: '우리의 눈은 사물을 보는 것을 도와줘요.' },
            { words: ['We', 'hear', 'music', 'with', 'our', 'ears.'], ko: '우리는 귀로 음악을 들어요.' },
            { words: ['We', 'smell', 'flowers', 'with', 'our', 'nose.'], ko: '우리는 코로 꽃 냄새를 맡아요.' },
          ]
        },
        {
          id: 'r01-03',
          sectionId: 'section-01',
          title: 'Llamas',
          category: 'Animals',
          emoji: '🦙',
          vocabulary: [
            { word: 'llama', meaning: '라마', ipa: '/lɑ́ːmə/', image: '🦙', phonics: ['l','l','a','m','a'] },
            { word: 'look like', meaning: '~처럼 보이다', ipa: '/lʊk laɪk/', image: '👀', phonics: ['l','o','o','k','l','i','k','e'] },
            { word: 'camel', meaning: '낙타', ipa: '/kǽməl/', image: '🐫', phonics: ['c','a','m','e','l'] },
            { word: 'hump', meaning: '혹', ipa: '/hʌmp/', image: '🐪', phonics: ['h','u','m','p'] },
            { word: 'head', meaning: '머리', ipa: '/hed/', image: '🗣️', phonics: ['h','e','a','d'] },
            { word: 'neck', meaning: '목', ipa: '/nek/', image: '🦒', phonics: ['n','e','c','k'] },
            { word: 'leg', meaning: '다리', ipa: '/leɡ/', image: '🦵', phonics: ['l','e','g'] },
            { word: 'each', meaning: '각각의', ipa: '/iːtʃ/', image: '☝️', phonics: ['e','a','c','h'] },
            { word: 'toenail', meaning: '발톱', ipa: '/tóʊneɪl/', image: '🦶', phonics: ['t','o','e','n','a','i','l'] },
            { word: 'live', meaning: '살다', ipa: '/lɪv/', image: '🏠', phonics: ['l','i','v','e'] },
            { word: 'walk', meaning: '걷다', ipa: '/wɔːk/', image: '🚶', phonics: ['w','a','l','k'] },
            { word: 'up to', meaning: '~까지', ipa: '/ʌp tuː/', image: '⬆️', phonics: ['u','p','t','o'] },
            { word: 'without', meaning: '~없이', ipa: '/wɪðáʊt/', image: '🚫', phonics: ['w','i','t','h','o','u','t'] },
            { word: 'carry', meaning: '나르다, 운반하다', ipa: '/kǽri/', image: '📦', phonics: ['c','a','r','r','y'] },
            { word: 'heavy', meaning: '무거운', ipa: '/hévi/', image: '🏋️', phonics: ['h','e','a','v','y'] },
            { word: 'helpful', meaning: '도움이 되는', ipa: '/hélpfəl/', image: '🤗', phonics: ['h','e','l','p','f','u','l'] },
          ],
          passage: [
            { en: 'Do you know about llamas?', ko: '라마에 대해 알고 있나요?' },
            { en: 'They look like camels.', ko: '라마는 낙타처럼 보여요.' },
            { en: "But llamas don't have humps.", ko: '하지만 라마에게는 혹이 없어요.' },
            { en: 'They have a small head.', ko: '라마는 작은 머리를 가지고 있어요.' },
            { en: 'They have a long neck.', ko: '라마는 긴 목을 가지고 있어요.' },
            { en: 'They have long ears.', ko: '라마는 긴 귀를 가지고 있어요.' },
            { en: 'They also have four long legs.', ko: '또한 네 개의 긴 다리를 가지고 있어요.' },
            { en: 'Each foot has two toenails.', ko: '각 발에는 두 개의 발톱이 있어요.' },
            { en: 'Llamas live in South America.', ko: '라마는 남아메리카에 살아요.' },
            { en: 'They walk up to 26 kilometers a day.', ko: '라마는 하루에 26킬로미터까지 걸어요.' },
            { en: 'They go a long time without water.', ko: '라마는 오랜 시간 물 없이 지내요.' },
            { en: 'They carry heavy things for people.', ko: '라마는 사람들을 위해 무거운 것을 날라요.' },
            { en: 'So they are very helpful to people!', ko: '그래서 라마는 사람들에게 매우 도움이 돼요!' },
          ],
          questions: [
            {
              text: '라마는 무엇과 비슷하게 생겼나요?',
              type: 'detail',
              choices: ['말 (horse)', '낙타 (camel)', '개 (dog)', '고양이 (cat)'],
              answer: 1,
              hint: '"look like"이 나오는 문장을 확인해보세요.',
              excerpt: 'They look like camels.'
            },
            {
              text: '라마의 각 발에는 발톱이 몇 개 있나요?',
              type: 'detail',
              choices: ['1개', '2개', '3개', '4개'],
              answer: 1,
              hint: '"toenail"이 나오는 문장을 찾아보세요.',
              excerpt: 'Each foot has two toenails.'
            },
            {
              text: '라마는 어디에 살고 있나요?',
              type: 'detail',
              choices: ['아프리카', '아시아', '남아메리카', '유럽'],
              answer: 2,
              hint: '"live"가 나오는 문장을 확인해보세요.',
              excerpt: 'Llamas live in South America.'
            },
            {
              text: '라마가 사람들에게 도움이 되는 이유는 무엇인가요?',
              type: 'inference',
              choices: ['맛있는 음식을 줘서', '무거운 것을 날라 줘서', '빠르게 달려서', '물을 만들어 줘서'],
              answer: 1,
              hint: '"carry"와 "heavy"가 나오는 문장을 읽어보세요.',
              excerpt: 'They carry heavy things for people.'
            },
          ],
          sentenceBuilding: [
            { words: ['Each', 'foot', 'has', 'two', 'toenails.'], ko: '각 발에는 두 개의 발톱이 있어요.' },
            { words: ['They', 'look', 'like', 'camels.'], ko: '라마는 낙타처럼 보여요.' },
            { words: ['They', 'have', 'a', 'long', 'neck.'], ko: '라마는 긴 목을 가지고 있어요.' },
            { words: ['Llamas', 'live', 'in', 'South', 'America.'], ko: '라마는 남아메리카에 살아요.' },
          ]
        }
      ]
    },
    {
      id: 'section-02',
      title: 'Section 02',
      theme: 'Food · Sports · Weather',
      emoji: '🌟',
      color: '#FF6B9D',
      readings: [
        {
          id: 'r02-01',
          sectionId: 'section-02',
          title: 'My Favorite Food',
          category: 'Food',
          emoji: '🍕',
          vocabulary: [
            { word: 'favorite', meaning: '가장 좋아하는', ipa: '/ˈfeɪvərɪt/', image: '❤️', phonics: ['f','a','v','o','r','i','t','e'] },
            { word: 'pizza', meaning: '피자', ipa: '/ˈpiːtsə/', image: '🍕', phonics: ['p','i','z','z','a'] },
            { word: 'cheese', meaning: '치즈', ipa: '/tʃiːz/', image: '🧀', phonics: ['c','h','e','e','s','e'] },
            { word: 'delicious', meaning: '맛있는', ipa: '/dɪˈlɪʃəs/', image: '😋', phonics: ['d','e','l','i','c','i','o','u','s'] },
            { word: 'breakfast', meaning: '아침 식사', ipa: '/ˈbrekfəst/', image: '🥞', phonics: ['b','r','e','a','k','f','a','s','t'] },
            { word: 'lunch', meaning: '점심', ipa: '/lʌntʃ/', image: '🍱', phonics: ['l','u','n','c','h'] },
            { word: 'dinner', meaning: '저녁', ipa: '/ˈdɪnər/', image: '🍽️', phonics: ['d','i','n','n','e','r'] },
            { word: 'cook', meaning: '요리하다', ipa: '/kʊk/', image: '👨‍🍳', phonics: ['c','o','o','k'] },
            { word: 'rice', meaning: '밥', ipa: '/raɪs/', image: '🍚', phonics: ['r','i','c','e'] },
            { word: 'soup', meaning: '수프', ipa: '/suːp/', image: '🍲', phonics: ['s','o','u','p'] },
            { word: 'fruit', meaning: '과일', ipa: '/fruːt/', image: '🍎', phonics: ['f','r','u','i','t'] },
            { word: 'healthy', meaning: '건강한', ipa: '/ˈhelθi/', image: '💪', phonics: ['h','e','a','l','t','h','y'] },
          ],
          passage: [
            { en: 'I love food!', ko: '나는 음식을 좋아해요!' },
            { en: 'My favorite food is pizza.', ko: '내가 가장 좋아하는 음식은 피자예요.' },
            { en: 'Pizza has cheese on top.', ko: '피자 위에는 치즈가 있어요.' },
            { en: 'It is delicious!', ko: '정말 맛있어요!' },
            { en: 'I eat rice for breakfast.', ko: '나는 아침에 밥을 먹어요.' },
            { en: 'I eat soup for lunch.', ko: '나는 점심에 수프를 먹어요.' },
            { en: 'My mom cooks dinner every day.', ko: '엄마는 매일 저녁을 요리해요.' },
            { en: 'I also eat fruit.', ko: '나는 과일도 먹어요.' },
            { en: 'Fruit is healthy and sweet.', ko: '과일은 건강하고 달콤해요.' },
            { en: 'I want to be a good cook someday!', ko: '나는 언젠가 훌륭한 요리사가 되고 싶어요!' },
          ],
          questions: [
            {
              text: '이 글쓴이가 가장 좋아하는 음식은 무엇인가요?',
              type: 'detail',
              choices: ['수프 (soup)', '피자 (pizza)', '밥 (rice)', '과일 (fruit)'],
              answer: 1,
              hint: '"favorite"\uac00 나오는 문장을 찾아보세요.',
              excerpt: 'My favorite food is pizza.'
            },
            {
              text: '아침에는 무엇을 먹나요?',
              type: 'detail',
              choices: ['피자', '수프', '밥', '과일'],
              answer: 2,
              hint: '"breakfast"가 나오는 문장을 확인해보세요.',
              excerpt: 'I eat rice for breakfast.'
            },
            {
              text: '누가 저녁을 요리하나요?',
              type: 'detail',
              choices: ['아빠', '엄마', '나', '친구'],
              answer: 1,
              hint: '"cook"과 "dinner"가 나오는 문장을 읽어보세요.',
              excerpt: 'My mom cooks dinner every day.'
            },
            {
              text: '과일에 대해 맞는 것은?',
              type: 'detail',
              choices: ['매워요', '건강하고 달콤해요', '믤4싸요', '못맛어요'],
              answer: 1,
              hint: '"fruit"가 나오는 문장들을 읽어보세요.',
              excerpt: 'Fruit is healthy and sweet.'
            },
          ],
          sentenceBuilding: [
            { words: ['My', 'favorite', 'food', 'is', 'pizza.'], ko: '내가 가장 좋아하는 음식은 피자예요.' },
            { words: ['Pizza', 'has', 'cheese', 'on', 'top.'], ko: '피자 위에는 치즈가 있어요.' },
            { words: ['Fruit', 'is', 'healthy', 'and', 'sweet.'], ko: '과일은 건강하고 달콤해요.' },
            { words: ['My', 'mom', 'cooks', 'dinner', 'every', 'day.'], ko: '엄마는 매일 저녁을 요리해요.' },
          ]
        },
        {
          id: 'r02-02',
          sectionId: 'section-02',
          title: 'Sports Day',
          category: 'Sports',
          emoji: '⚽',
          vocabulary: [
            { word: 'sports', meaning: '운동', ipa: '/spɔːrts/', image: '⚽', phonics: ['s','p','o','r','t','s'] },
            { word: 'soccer', meaning: '축구', ipa: '/ˈsɑːkər/', image: '⚽', phonics: ['s','o','c','c','e','r'] },
            { word: 'basketball', meaning: '농구', ipa: '/ˈbæskɪtbɔːl/', image: '🏀', phonics: ['b','a','s','k','e','t','b','a','l','l'] },
            { word: 'run', meaning: '달리다', ipa: '/rʌn/', image: '🏃', phonics: ['r','u','n'] },
            { word: 'fast', meaning: '빨리', ipa: '/fæst/', image: '💨', phonics: ['f','a','s','t'] },
            { word: 'jump', meaning: '점프하다', ipa: '/dʒʌmp/', image: '🤸', phonics: ['j','u','m','p'] },
            { word: 'team', meaning: '팀', ipa: '/tiːm/', image: '👥', phonics: ['t','e','a','m'] },
            { word: 'win', meaning: '이기다', ipa: '/wɪn/', image: '🏆', phonics: ['w','i','n'] },
            { word: 'practice', meaning: '연습하다', ipa: '/ˈpræktɪs/', image: '💪', phonics: ['p','r','a','c','t','i','c','e'] },
            { word: 'every', meaning: '매, 모든', ipa: '/ˈevri/', image: '📅', phonics: ['e','v','e','r','y'] },
          ],
          passage: [
            { en: 'I love sports!', ko: '나는 운동을 좋아해요!' },
            { en: 'My favorite sport is soccer.', ko: '내가 가장 좋아하는 운동은 축구예요.' },
            { en: 'I play soccer with my friends.', ko: '나는 친구들과 축구를 해요.' },
            { en: 'I can run very fast.', ko: '나는 매우 빨리 달릴 수 있어요.' },
            { en: 'I can jump high, too.', ko: '나는 높이 점프할 수도 있어요.' },
            { en: 'We have a soccer team.', ko: '우리는 축구 팀이 있어요.' },
            { en: 'We practice every day.', ko: '우리는 매일 연습해요.' },
            { en: 'We want to win!', ko: '우리는 이기고 싶어요!' },
            { en: 'I also like basketball.', ko: '나는 농구도 좋아해요.' },
            { en: 'Sports make me happy!', ko: '운동은 나를 행복하게 해줘요!' },
          ],
          questions: [
            {
              text: '이 글쓴이가 가장 좋아하는 운동은?',
              type: 'detail',
              choices: ['농구', '축구', '야구', '탁구'],
              answer: 1,
              hint: '"favorite sport"가 나오는 문장을 찾아보세요.',
              excerpt: 'My favorite sport is soccer.'
            },
            {
              text: '우리 팀은 얼마나 자주 연습하나요?',
              type: 'detail',
              choices: ['주말마다', '매일', '한 달에 한 번', '일 년에 한 번'],
              answer: 1,
              hint: '"practice"와 "every"가 나오는 문장을 확인해보세요.',
              excerpt: 'We practice every day.'
            },
            {
              text: '글쓴이는 운동이 어떤 느낌을 주나요?',
              type: 'inference',
              choices: ['슬프게', '행복하게', '화나게', '무서게'],
              answer: 1,
              hint: '마지막 문장을 읽어보세요.',
              excerpt: 'Sports make me happy!'
            },
            {
              text: '글쓴이는 누구와 축구를 하나요?',
              type: 'detail',
              choices: ['가족', '친구들', '선생님', '혼자'],
              answer: 1,
              hint: '"play soccer with"가 나오는 문장을 확인해보세요.',
              excerpt: 'I play soccer with my friends.'
            },
          ],
          sentenceBuilding: [
            { words: ['I', 'can', 'run', 'very', 'fast.'], ko: '나는 매우 빨리 달릴 수 있어요.' },
            { words: ['We', 'practice', 'every', 'day.'], ko: '우리는 매일 연습해요.' },
            { words: ['Sports', 'make', 'me', 'happy!'], ko: '운동은 나를 행복하게 해줘요!' },
            { words: ['We', 'have', 'a', 'soccer', 'team.'], ko: '우리는 축구 팀이 있어요.' },
          ]
        },
        {
          id: 'r02-03',
          sectionId: 'section-02',
          title: 'The Weather',
          category: 'Weather',
          emoji: '☀️',
          vocabulary: [
            { word: 'weather', meaning: '날씨', ipa: '/ˈweðər/', image: '☀️', phonics: ['w','e','a','t','h','e','r'] },
            { word: 'sunny', meaning: '해가 나는', ipa: '/ˈsʌni/', image: '☀️', phonics: ['s','u','n','n','y'] },
            { word: 'rainy', meaning: '비가 오는', ipa: '/ˈreɪni/', image: '🌧️', phonics: ['r','a','i','n','y'] },
            { word: 'cloud', meaning: '구름', ipa: '/klaʊd/', image: '☁️', phonics: ['c','l','o','u','d'] },
            { word: 'snow', meaning: '눈', ipa: '/snoʊ/', image: '❄️', phonics: ['s','n','o','w'] },
            { word: 'cold', meaning: '추운', ipa: '/koʊld/', image: '🥶', phonics: ['c','o','l','d'] },
            { word: 'hot', meaning: '더운', ipa: '/hɑːt/', image: '🥵', phonics: ['h','o','t'] },
            { word: 'umbrella', meaning: '우산', ipa: '/ʌmˈbrelə/', image: '☂️', phonics: ['u','m','b','r','e','l','l','a'] },
            { word: 'outside', meaning: '바깥', ipa: '/ˈaʊtsɑɪd/', image: '🏡', phonics: ['o','u','t','s','i','d','e'] },
            { word: 'season', meaning: '계절', ipa: '/ˈsiːzən/', image: '🍃', phonics: ['s','e','a','s','o','n'] },
          ],
          passage: [
            { en: 'Today is a sunny day.', ko: '오늘은 해가 나는 날이에요.' },
            { en: 'The sky is blue.', ko: '하늘이 파란색이에요.' },
            { en: 'I like sunny days.', ko: '나는 해가 나는 날을 좋아해요.' },
            { en: 'Sometimes it is rainy.', ko: '때때로 비가 와요.' },
            { en: 'I need an umbrella on rainy days.', ko: '비 오는 날에는 우산이 필요해요.' },
            { en: 'In winter, it is cold.', ko: '겨울에는 추워요.' },
            { en: 'Sometimes it snows.', ko: '때때로 눈이 와요.' },
            { en: 'In summer, it is hot.', ko: '여름에는 더워요.' },
            { en: 'I like to play outside.', ko: '나는 바깥에서 노는 것을 좋아해요.' },
            { en: 'Every season has different weather.', ko: '매 계절마다 다른 날씨가 있어요.' },
          ],
          questions: [
            {
              text: '오늘 날씨는 어떤가요?',
              type: 'detail',
              choices: ['비가 와요', '해가 나요', '눈이 와요', '구름이 끼었어요'],
              answer: 1,
              hint: '첫 문장을 읽어보세요.',
              excerpt: 'Today is a sunny day.'
            },
            {
              text: '비 오는 날에 필요한 것은?',
              type: 'detail',
              choices: ['모자', '우산', '선글라스', '장갑'],
              answer: 1,
              hint: '"umbrella"가 나오는 문장을 찾아보세요.',
              excerpt: 'I need an umbrella on rainy days.'
            },
            {
              text: '여름에는 날씨가 어떤가요?',
              type: 'detail',
              choices: ['추워요', '더워요', '바람이 불어요', '눈이 와요'],
              answer: 1,
              hint: '"summer"가 나오는 문장을 확인해보세요.',
              excerpt: 'In summer, it is hot.'
            },
            {
              text: '이 글의 주제는 무엇인가요?',
              type: 'main-idea',
              choices: ['음식에 대해', '날씨와 계절에 대해', '운동에 대해', '가족에 대해'],
              answer: 1,
              hint: '글에서 가장 많이 나오는 단어가 무엇인지 생각해보세요.',
              excerpt: 'Every season has different weather.'
            },
          ],
          sentenceBuilding: [
            { words: ['Today', 'is', 'a', 'sunny', 'day.'], ko: '오늘은 해가 나는 날이에요.' },
            { words: ['In', 'winter,', 'it', 'is', 'cold.'], ko: '겨울에는 추워요.' },
            { words: ['I', 'like', 'to', 'play', 'outside.'], ko: '나는 바깥에서 노는 것을 좋아해요.' },
            { words: ['I', 'need', 'an', 'umbrella.'], ko: '나는 우산이 필요해요.' },
          ]
        }
      ]
    }
  ]
};

// Phonics data for unique letters in each reading
export function getPhonicsForReading(reading) {
  const uniqueLetters = new Set();
  reading.vocabulary.forEach(v => {
    const w = v.word.replace(/\s/g, '');
    for (const ch of w.toLowerCase()) {
      if (/[a-z]/.test(ch)) uniqueLetters.add(ch);
    }
  });

  const phonicsMap = {
    a: { upper: 'A', lower: 'a', sound: '/æ/ (애)', ttsSound: 'æ', example: 'animal', exampleKo: '동물' },
    b: { upper: 'B', lower: 'b', sound: '/b/ (브)', ttsSound: 'buh', example: 'body', exampleKo: '몸' },
    c: { upper: 'C', lower: 'c', sound: '/k/ (크)', ttsSound: 'kuh', example: 'cut', exampleKo: '자르다' },
    d: { upper: 'D', lower: 'd', sound: '/d/ (드)', ttsSound: 'duh', example: 'desert', exampleKo: '사막' },
    e: { upper: 'E', lower: 'e', sound: '/ɛ/ (에)', ttsSound: 'eh', example: 'egg', exampleKo: '달걀' },
    f: { upper: 'F', lower: 'f', sound: '/f/ (프)', ttsSound: 'fff', example: 'food', exampleKo: '음식' },
    g: { upper: 'G', lower: 'g', sound: '/g/ (그)', ttsSound: 'guh', example: 'go', exampleKo: '가다' },
    h: { upper: 'H', lower: 'h', sound: '/h/ (흐)', ttsSound: 'hah', example: 'help', exampleKo: '돕다' },
    i: { upper: 'I', lower: 'i', sound: '/ɪ/ (이)', ttsSound: 'ih', example: 'in', exampleKo: '안에' },
    j: { upper: 'J', lower: 'j', sound: '/dʒ/ (쥐)', ttsSound: 'juh', example: 'jump', exampleKo: '뛰다' },
    k: { upper: 'K', lower: 'k', sound: '/k/ (크)', ttsSound: 'kuh', example: 'king', exampleKo: '왕' },
    l: { upper: 'L', lower: 'l', sound: '/l/ (ㄹ)', ttsSound: 'lll', example: 'lake', exampleKo: '호수' },
    m: { upper: 'M', lower: 'm', sound: '/m/ (음)', ttsSound: 'mmm', example: 'move', exampleKo: '움직이다' },
    n: { upper: 'N', lower: 'n', sound: '/n/ (은)', ttsSound: 'nnn', example: 'need', exampleKo: '필요하다' },
    o: { upper: 'O', lower: 'o', sound: '/ɒ/ (오)', ttsSound: 'aw', example: 'on', exampleKo: '위에' },
    p: { upper: 'P', lower: 'p', sound: '/p/ (프)', ttsSound: 'puh', example: 'plant', exampleKo: '식물' },
    q: { upper: 'Q', lower: 'q', sound: '/kw/ (큐)', ttsSound: 'kwuh', example: 'queen', exampleKo: '여왕' },
    r: { upper: 'R', lower: 'r', sound: '/r/ (르)', ttsSound: 'rrr', example: 'river', exampleKo: '강' },
    s: { upper: 'S', lower: 's', sound: '/s/ (스)', ttsSound: 'sss', example: 'sea', exampleKo: '바다' },
    t: { upper: 'T', lower: 't', sound: '/t/ (트)', ttsSound: 'tuh', example: 'touch', exampleKo: '만지다' },
    u: { upper: 'U', lower: 'u', sound: '/ʌ/ (어)', ttsSound: 'uh', example: 'up', exampleKo: '위로' },
    v: { upper: 'V', lower: 'v', sound: '/v/ (브)', ttsSound: 'vvv', example: 'very', exampleKo: '매우' },
    w: { upper: 'W', lower: 'w', sound: '/w/ (우)', ttsSound: 'wuh', example: 'wind', exampleKo: '바람' },
    x: { upper: 'X', lower: 'x', sound: '/ks/ (크스)', ttsSound: 'ks', example: 'box', exampleKo: '상자' },
    y: { upper: 'Y', lower: 'y', sound: '/j/ (이)', ttsSound: 'yuh', example: 'yes', exampleKo: '네' },
    z: { upper: 'Z', lower: 'z', sound: '/z/ (즈)', ttsSound: 'zzz', example: 'zoo', exampleKo: '동물원' },
  };

  return [...uniqueLetters].sort().map(l => ({
    letter: l,
    ...phonicsMap[l]
  }));
}

// Get all previously learned words across all readings before this one
export function getPreviouslyLearnedWords(readingId) {
  const allReadings = CONTENT_DATA.sections.flatMap(s => s.readings);
  const currentIdx = allReadings.findIndex(r => r.id === readingId);
  if (currentIdx <= 0) return [];

  const prev = [];
  for (let i = 0; i < currentIdx; i++) {
    allReadings[i].vocabulary.forEach(v => prev.push(v.word.toLowerCase()));
  }
  return prev;
}
