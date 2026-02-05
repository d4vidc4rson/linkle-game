export type PuzzleDifficulty = 'EASY' | 'HARD' | 'IMPOSSIBLE';

export interface Puzzle {
    solution: string[];
    narrative: string;
    difficulty: PuzzleDifficulty;
}

export const PREGENERATED_PUZZLES: Puzzle[] = [
    {
        solution: ["KEY", "BOARD", "CERTIFIED", "ORGANIC", "CHEMISTRY", "BOND", "MARKET", "PRICE", "TAG"],
        narrative: "A KEY is part of a KEYBOARD. A board can be BOARD CERTIFIED. Certified can refer to CERTIFIED ORGANIC. Organic chemistry is a field of CHEMISTRY. In chemistry, there's a chemical BOND. A bond can be traded on the bond MARKET. The market determines the PRICE. A price is displayed on a price TAG.",
        difficulty: 'EASY'
    },
    {
        solution: ["STABLE", "HORSE", "POWER", "GRID", "IRON", "DEFICIENCY", "COMPLEX", "SENTENCE", "FRAGMENT"],
        narrative: "A STABLE is where you keep a HORSE. A horse has HORSEPOWER. POWER is distributed on a GRID. A football field is called the GRIDIRON. A lack of iron is an iron DEFICIENCY. A psychological hang-up over not being \"enough\" is a DEFICIENCY COMPLEX. A grammatical structure is a COMPLEX SENTENCE. An incomplete sentence is a SENTENCE FRAGMENT.",
        difficulty: 'EASY'
    },
    {
        solution: ["LEADER", "BOARD", "ROOM", "SERVICE", "INDUSTRY", "STANDARD", "ISSUE", "PAPER", "WEIGHT"],
        narrative: "The head of a group is a LEADER, which is the first part of LEADERBOARD. A BOARD meeting happens in a BOARDROOM. A ROOM can have ROOM SERVICE. Service is a type of INDUSTRY. The INDUSTRY STANDARD is a common term. An issue can be a standard ISSUE. An issue can also be a periodical, like a PAPER. A paper can be held down by a PAPERWEIGHT.",
        difficulty: 'EASY'
    },
    {
        solution: ["CAR", "POOL", "TABLE", "SPOON", "FEED", "BACK", "PACK", "RAT", "RACE"],
        narrative: "A CARPOOL saves gas. A POOL TABLE is for billiards. A TABLESPOON is a measurement. To SPOON-FEED is to help someone eat. FEEDBACK is a response. A BACKPACK carries things. A PACK RAT collects items. The RAT RACE is a struggle.",
        difficulty: 'EASY'
    },
    {
        solution: ["BRAIN", "WASH", "CLOTH", "DIAPER", "RASH", "DECISION", "MAKERS", "MARK", "WORDS"],
        narrative: "To BRAINWASH someone is to indoctrinate them. You use a WASHCLOTH to clean yourself. A CLOTH DIAPER is reusable. A baby can get a DIAPER RASH. A RASH DECISION is made hastily. Those in charge are DECISION-MAKERS. MAKERS MARK is a brand of bourbon. To MARK MY WORDS is to emphasize a prediction.",
        difficulty: 'EASY'
    },
    {
        solution: ["TRADE", "SECRET", "AGENT", "ORANGE", "JUICE", "BOX", "SEAT", "BELT", "SANDER"],
        narrative: "A TRADE SECRET is confidential business information. A SECRET AGENT is a spy. AGENT ORANGE is an herbicide. ORANGE JUICE is a drink. A JUICE BOX is a container for drinks. A BOX SEAT is a premium seat in a theater. A SEAT BELT is a safety restraint in a vehicle. A BELT SANDER is a power tool for sanding.",
        difficulty: 'EASY'
    },
    {
        solution: ["LOVE", "SEAT", "COVER", "CHARGE", "CARD", "TRICK", "QUESTION", "MARK", "DOWN"],
        narrative: "A LOVE SEAT is a small sofa. A SEAT COVER protects a seat. A COVER CHARGE is an entrance fee. A CHARGE CARD is for payments. A CARD TRICK is a magic illusion. A TRICK QUESTION is misleading. A QUESTION MARK is punctuation. To MARK DOWN is to reduce a price.",
        difficulty: 'EASY'
    },
    {
        solution: ["AIR", "HEAD", "START", "OVER", "COUNTER", "OFFER", "SHEET", "MUSIC", "BOX"],
        narrative: "A silly person is an AIRHEAD. An early advantage is a HEAD START. To begin again is to START OVER. Medicine sold without a prescription is OVER THE COUNTER. A response to an initial proposal is a COUNTER OFFER. A contract for an athlete is an OFFER SHEET. Written music is printed on SHEET MUSIC. A decorative box that plays a tune is a MUSIC BOX.",
        difficulty: 'EASY'
    },
    {
        solution: ["CAT", "FIGHT", "CLUB", "SODA", "CRACKER", "BARREL", "ROLL", "CALL", "CENTER"],
        narrative: "A CATFIGHT is a fierce argument. A FIGHT CLUB is a secret group. A CLUB SODA is a beverage. A SODA CRACKER is a snack. CRACKER BARREL is a restaurant. A BARREL ROLL is an aerial maneuver. A ROLL CALL is for taking attendance. A CALL CENTER handles customer inquiries.",
        difficulty: 'EASY'
    },
    {
        solution: ["ARM", "REST", "STOP", "WATCH", "DOG", "HOUSE", "BOAT", "YARD", "SALE"],
        narrative: "A chair has an ARMREST. A REST STOP is a place to break on a journey. A STOPWATCH is for timing. A WATCHDOG guards property. A DOGHOUSE is a shelter for a dog. A HOUSEBOAT is a floating home. A BOATYARD is for storing and repairing boats. A YARD SALE is for selling used items.",
        difficulty: 'EASY'
    },
    {
        solution: ["EAR", "DRUM", "STICK", "SHIFT", "GEAR", "BOX", "CAR", "RACER", "SNAKE"],
        narrative: "An EARDRUM is in the ear. A DRUMSTICK is for drumming. A STICK SHIFT is a manual transmission. To SHIFT GEARS is to change speed. A GEARBOX contains gears. A BOXCAR is a train car. A CAR RACER drives fast. RACER is a type of SNAKE.",
        difficulty: 'EASY'
    },
    {
        solution: ["MOTOR", "MOUTH", "PIECE", "WORK", "HORSE", "PLAY", "DATE", "LINE", "JUDGE"],
        narrative: "A MOTORMOUTH is someone who talks incessantly. A MOUTHPIECE speaks on behalf of others. PIECEWORK is a job paid by the amount of work done. A WORKHORSE is a reliable and tireless worker. HORSEPLAY is rough, boisterous play. A PLAYDATE is a social arrangement for children. DATELINE is a news program. A LINE JUDGE makes calls in sports like tennis or football.",
        difficulty: 'EASY'
    },
    {
        solution: ["BOOK", "MARK", "UP", "FRONT", "PAGE", "TURNER", "CLASSIC", "ROCK", "BAND"],
        narrative: "You use a BOOKMARK to save your place. MARKUP is used in pricing. An UPFRONT payment is made in advance. Important news goes on the FRONT PAGE. A PAGE-TURNER is an exciting book. TURNER CLASSIC is a movie channel. CLASSIC ROCK is a music genre. A ROCK BAND plays music.",
        difficulty: 'HARD'
    },
    {
        solution: ["SUGAR", "DADDY", "TIME", "TRAVEL", "SOCCER", "MOM", "JEANS", "POCKET", "ROCKET"],
        narrative: "A SUGAR DADDY is a wealthy, generous older man. Quality time with a father is DADDY TIME. TIME TRAVEL is the concept of moving through time. A youth TRAVEL SOCCER team plays in different cities. A SOCCER MOM drives her kids to their games. MOM JEANS are a high-waisted style of denim. A pair of JEANS has a POCKET. A POCKET ROCKET is a small, powerful vibrator.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MIDLIFE", "CRISIS", "ACTOR", "STUDIO", "APARTMENT", "COMPLEX", "CARBOHYDRATE", "LOADING", "DOCK"],
        narrative: "A MIDLIFE CRISIS is a psychological event. A CRISIS ACTOR is a conspiracy theory term. AN ACTOR'S STUDIO is a workshop. A STUDIO APARTMENT is a small dwelling. AN APARTMENT COMPLEX is a group of buildings. A COMPLEX CARBOHYDRATE is a food type. CARBOHYDRATE LOADING is an athletic strategy. A LOADING DOCK is for deliveries.",
        difficulty: 'EASY'
    },
    {
        solution: ["SAFETY", "PIN", "HEAD", "LINE", "DRIVE", "WAY", "SIDE", "TRACK", "RECORD"],
        narrative: "A SAFETY PIN is used to fasten clothing. A foolish person can be called a PINHEAD. A newspaper has a HEADLINE. In baseball, a LINE DRIVE is a type of hit. A house has a DRIVEWAY. To fall by the WAYSIDE is to fail to persist. To get distracted is to be SIDETRACKED. Someone's past performance is their TRACK RECORD.",
        difficulty: 'EASY'
    },
    {
        solution: ["LAME", "DUCK", "SAUCE", "BOSS", "HOGG", "WILD", "GOOSE", "CHASE", "SCENE"],
        narrative: "A LAME DUCK is an official finishing a term. DUCK SAUCE is a condiment. SAUCE BOSS is a confident person. BOSS HOGG is a TV character. To HOG-WILD is to be unrestrained. A WILD GOOSE CHASE is a futile search. A CHASE SCENE is in a movie.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["THIRST", "TRAP", "HOUSE", "PARTY", "POOPER", "SCOOP", "NECK", "BEARD", "OIL"],
        narrative: "A THIRST TRAP is a provocative social media post. A TRAP HOUSE is a term from music and slang. A HOUSE PARTY is a social gathering at home. A PARTY POOPER ruins all the fun. A POOPER SCOOP is for cleaning up after pets. A SCOOP NECK is a style of shirt. A NECKBEARD is a slang term for a certain type of person. BEARD OIL is for grooming facial hair.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SECOND", "GUESS", "WORK", "SHOP", "LIFTING", "BELT", "BUCKLE", "UP", "TOWN"],
        narrative: "To SECOND-GUESS is to doubt a decision. GUESSWORK is making an estimate without data. A WORKSHOP is a place for making or repairing things. SHOPLIFTING is the act of stealing from a store. A LIFTING BELT provides back support. A BELT BUCKLE fastens a belt. To BUCKLE UP is to fasten your seatbelt. UPTOWN is a part of a city.",
        difficulty: 'EASY'
    },
    {
        solution: ["BODY", "GUARD", "RAIL", "ROAD", "BLOCK", "CHAIN", "MAIL", "FRAUD", "ALERT"],
        narrative: "A BODYGUARD provides protection. A GUARDRAIL is a safety barrier. A RAILROAD is for trains. A ROADBLOCK is an obstruction. A BLOCKCHAIN is a digital ledger. CHAIN MAIL is a type of armor. MAIL FRAUD is a crime. A FRAUD ALERT is a notification of a suspicious activity.",
        difficulty: 'EASY'
    },
    {
        solution: ["CRASH", "HELMET", "HAIR", "SPRAY", "PAINT", "BALL", "BOY", "SCOUT", "LAW"],
        narrative: "A CRASH HELMET is for safety. You can get HELMET HAIR after wearing one. You style with HAIR SPRAY. You can use SPRAY PAINT for graffiti. PAINTBALL is a competitive game. A BALL BOY retrieves balls in tennis. A BOY SCOUT learns outdoor skills. The SCOUT LAW is a code of conduct.",
        difficulty: 'EASY'
    },
    {
        solution: ["NIGHT", "OWL", "PELLET", "GUN", "SHY", "BLADDER", "CANCER", "STICK", "FIGURE"],
        narrative: "A NIGHT OWL stays up late. An OWL PELLET is undigested parts. A PELLET GUN shoots small pellets. To be GUN-SHY is to be hesitant. A SHY BLADDER is a medical condition. BLADDER CANCER is a disease. A CANCER STICK is slang for a cigarette. A STICK FIGURE is a simple drawing.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BELLY", "FLOP", "HOUSE", "ARREST", "RECORD", "PLAYER", "ONE", "LINER", "NOTES"],
        narrative: "A BELLY FLOP is a dive into water. A FLOPHOUSE is a cheap hotel. To be under HOUSE ARREST is to be confined to your home. AN ARREST RECORD is a list of a person's crimes. A RECORD PLAYER is for vinyl. The main video game participant is PLAYER ONE. A ONE-LINER is a short joke. LINER NOTES are the text included with a music album.",
        difficulty: 'EASY'
    },
    {
        solution: ["SOCIAL", "BUTTERFLY", "EFFECT", "SIZE", "QUEEN", "BEE", "HIVE", "MIND", "GAME"],
        narrative: "A SOCIAL BUTTERFLY is very outgoing. The BUTTERFLY EFFECT is a concept in chaos theory. EFFECT SIZE is a statistical measure. A SIZE QUEEN is a slang term for someone who prefers larger partners. A QUEEN BEE is the leader of a colony. A BEEHIVE is where bees live. A HIVE MIND is a collective consciousness. A MIND GAME is a psychological tactic.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["NETFLIX", "CHILL", "PILL", "BOX", "WINE", "COUNTRY", "ROAD", "RAGE", "QUIT"],
        narrative: "NETFLIX AND CHILL is a modern euphemism for a romantic evening. To calm down, someone might need a CHILL PILL. A PILLBOX is a type of hat or a container for medicine. You can buy WINE in a BOX WINE container. WINE COUNTRY is a region for vineyards. A rural path is a COUNTRY ROAD. Aggressive driving is called ROAD RAGE. To abruptly leave a game in frustration is to RAGE QUIT.",
        difficulty: 'EASY'
    },
    {
        solution: ["PENNY", "WISE", "CRACK", "POT", "LUCK", "CHARM", "SCHOOL", "YARD", "WORK"],
        narrative: "PENNY-WISE is being frugal. A WISECRACK is a joke. A CRACKPOT has strange ideas. POTLUCK is a communal meal. A LUCK CHARM is for good fortune. A finishing school is a CHARM SCHOOL. Children play in a SCHOOLYARD. Maintaining a lawn is YARDWORK.",
        difficulty: 'EASY'
    },
    {
        solution: ["HOT", "SAUCE", "PAN", "CAKE", "FACE", "LIFT", "OFF", "WHITE", "NOISE"],
        narrative: "HOT SAUCE is a spicy condiment. A SAUCEPAN is a cooking pot. A PANCAKE is a breakfast food. CAKE FACE is a slang term for wearing too much makeup. A FACELIFT is a cosmetic surgery. A rocket has a LIFTOFF. OFF-WHITE is a shade of color. WHITE NOISE is a type of sound.",
        difficulty: 'EASY'
    },
    {
        solution: ["TROJAN", "HORSE", "RACING", "FORM", "FITTING", "ROOM", "TEMPERATURE", "GAUGE", "EARRING"],
        narrative: "A TROJAN HORSE is a deceptive computer program. HORSE RACING is a sport. A RACING FORM provides information on horses. FORM-FITTING clothes are tight. A FITTING ROOM is for trying on clothes. ROOM TEMPERATURE is a moderate temperature. A TEMPERATURE GAUGE measures heat. A GAUGE EARRING stretches the earlobe.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BAD", "ROMANCE", "NOVEL", "IDEA", "MAN", "SPREAD", "SHEET", "PAN", "SEXUAL"],
        narrative: "BAD ROMANCE is a famous Lady Gaga song. A ROMANCE NOVEL is a genre of fiction. A NOVEL IDEA is a new and original concept. An IDEA MAN is a person who comes with creative ideas. A MANSPREAD is a slang term for a sitting posture. You organize data in a SPREADSHEET. A SHEET PAN is a type of baking tray. A person who is attracted to all genders is PANSEXUAL.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HOT", "TAKE", "OUT", "LAW", "ORDER", "FORM", "LETTER", "HEAD", "CASE"],
        narrative: "A HOT TAKE is a provocative opinion. You can order TAKE-OUT food. An OUTLAW is a fugitive. LAW AND ORDER is a popular TV show. AN ORDER FORM is a document for purchasing goods. A FORM LETTER is a standardized letter. A LETTERHEAD is the heading at the top of a document. A HEADCASE is a slang term for an eccentric person.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CABIN", "FEVER", "PITCH", "BLACK", "MAGIC", "TRICK", "KNEE", "JERK", "CHICKEN"],
        narrative: "CABIN FEVER comes from being cooped up. A FEVER PITCH is a state of high excitement. PITCH BLACK is complete darkness. BLACK MAGIC is supernatural. A MAGIC TRICK is an illusion. A TRICK KNEE is an unreliable joint. The KNEE-JERK reflex is an automatic response. JERK CHICKEN is a style of cooking native to Jamaica.",
        difficulty: 'EASY'
    },
    {
        solution: ["DOUBLE", "AGENT", "SMITH", "WESSON", "OIL", "CHANGE", "MACHINE", "HEAD", "GAMES"],
        narrative: "A DOUBLE AGENT works for two opposing sides. AGENT SMITH is a character from The Matrix. SMITH & WESSON is a firearms manufacturer. WESSON OIL is a brand of cooking oil. AN OIL CHANGE is routine car maintenance. A CHANGE MACHINE gives smaller bills or coins. MACHINE HEAD is a rock band. To play HEAD GAMES is to manipulate someone psychologically.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SUCKER", "PUNCH", "DRUNK", "HISTORY", "BUFF", "NAKED", "TRUTH", "SERUM", "SICKNESS"],
        narrative: "A SUCKER PUNCH is an unexpected blow. To be PUNCH-DRUNK is to be dazed from repeated hits. DRUNK HISTORY is a popular comedy TV show. A HISTORY BUFF is an enthusiast of the past. To be IN THE BUFF is a slang term for being naked. The unvarnished reality is the NAKED TRUTH. A TRUTH SERUM is a drug used in interrogation. SERUM SICKNESS is an immune response.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SAVAGE", "GARDEN", "HOSE", "DOWN", "LOW", "RIDE", "SHARE", "WARE", "HOUSE"],
        narrative: "SAVAGE GARDEN is a famous band. You water plants with a GARDEN HOSE. To HOSE DOWN something is to clean it with water. To be on the DOWN-LOW is to be secretive. A pair of jeans designed to sit low on the hips are called LOW RIDE jeans. A RIDESHARE is a service like Uber or Lyft. SHAREWARE is a type of software. A WAREHOUSE is a large storage building.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["JUMPING", "JACK", "FRUIT", "CAKE", "WALK", "TALL", "TALE", "SPIN", "CYCLE"],
        narrative: "A JUMPING JACK is an exercise. JACKFRUIT is a large fruit. A FRUITCAKE is a dense cake. A CAKEWALK is an easy task. To WALK TALL is to be proud. A TALL TALE is an exaggerated story. A rapid collapse into failure or confusion is a TALESPIN. A washing machine has a SPIN CYCLE.",
        difficulty: 'EASY'
    },
    {
        solution: ["BLOW", "FISH", "NET", "PROFIT", "MARGIN", "CALL", "GIRL", "FRIDAY", "NIGHT"],
        narrative: "A BLOWFISH is a type of poisonous fish. A FISHNET is a type of stocking. A company's bottom line is a NET PROFIT. The PROFIT MARGIN is a measure of profitability. A MARGIN CALL is a demand for additional funds in a brokerage account. A CALL GIRL is a prostitute. A GIRL FRIDAY is a female assistant. A popular time to go out is FRIDAY NIGHT.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["EQUAL", "RIGHTS", "ISSUE", "DATE", "BOOK", "LEARNING", "CURVE", "BALL", "PLAYER"],
        narrative: "The fight for EQUAL RIGHTS is a social movement. A RIGHTS ISSUE is a way for a company to raise capital. AN ISSUE DATE is when a document is officially released. You keep track of appointments in a DATEBOOK. Knowledge gained from books is BOOK LEARNING. The rate of progress in learning is a LEARNING CURVE. A CURVEBALL is a type of pitch in baseball. A person who plays ball sports is a BALLPLAYER.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FINGER", "NAIL", "FILE", "CABINET", "MAKER", "SPACE", "ODDITY", "COUPLE", "THERAPY"],
        narrative: "A tool for grooming is a FINGERNAIL file. You use a NAIL FILE to shape your nails. A FILE CABINET is used for office storage. A skilled woodworker is a CABINETMAKER. A collaborative workshop is a MAKERSPACE. SPACE ODDITY is a famous David Bowie song. The ODD COUPLE is a classic TV show. A couple might go to COUPLE'S THERAPY.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CANDY", "FLIP", "PHONE", "HOME", "BODY", "SLAM", "DUNK", "TANK", "GIRL"],
        narrative: "CANDYFLIP is a slang term for a drug combination. A FLIP PHONE is an old style of mobile phone. E.T. famously wanted to PHONE HOME. A person who enjoys staying at home is a HOMEBODY. A BODYSLAM is a wrestling move. A SLAM DUNK is an impressive basketball shot. A DUNK TANK is a popular carnival game. TANK GIRL is a cult classic comic book character.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["WET", "DREAM", "CATCHER", "RYE", "BREAD", "STICK", "UP", "TIGHT", "END"],
        narrative: "A WET DREAM is an erotic dream. A DREAMCATCHER is a handmade object. CATCHER in the RYE is a famous novel. RYE BREAD is a type of bread. A BREADSTICK is a dry piece of bread. To STICK-UP a place is to rob it. To be UPTIGHT is to be anxious or rigid. A TIGHT END is a position in American football.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CRASH", "PAD", "LOCK", "DOWN", "BOY", "WONDER", "BRA", "STRAP", "ON"],
        narrative: "A temporary place to sleep is a CRASH PAD. A PADLOCK is a portable lock. A LOCKDOWN is a state of isolation. To tell a dog to be still is to say DOWN BOY. BOY WONDER is a nickname for a young prodigy. A WONDERBRA is a brand of push-up bra. A BRA STRAP is part of a brassiere. A STRAP-ON is a type of dildo.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TOXIC", "WASTE", "BASKET", "CASE", "FILE", "SHARING", "ECONOMY", "CLASS", "RING"],
        narrative: "Hazardous material is TOXIC WASTE. A trash can is a WASTEBasket. A person who is a nervous wreck is a BASKET CASE. A CASE FILE contains documents for an investigation. FILE SHARING is the practice of distributing digital files. The SHARING ECONOMY includes services like Airbnb and Uber. A budget airline ticket is for ECONOMY CLASS. A CLASS RING is a commemorative piece of jewelry.",
        difficulty: 'EASY'
    },
    {
        solution: ["GOLDEN", "SHOWER", "THOUGHTS", "PRAYERS", "CHAIN", "REACTION", "TIME", "MACHINE", "GUN"],
        narrative: "A GOLDEN SHOWER is a sexual act. To have SHOWER THOUGHTS is to have epiphanies in the shower. To offer THOUGHTS AND PRAYERS is a common condolence. A prayer network is a PRAYER CHAIN. In physics, one event triggering a series of subsequent events is a CHAIN REACTION. How quickly one responds is their REACTION TIME. A TIME MACHINE is a hypothetical device for traveling through time. A MACHINE GUN is an automatic firearm.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GUT", "FEELING", "BLUE", "CHEESE", "CAKE", "FACTORY", "WORKER", "BEE", "LINE"],
        narrative: "A GUT FEELING is an intuition. FEELING BLUE means being sad. BLUE CHEESE has a strong flavor. A CHEESECAKE is a rich dessert. The CHEESECAKE FACTORY is a restaurant chain. A FACTORY WORKER is an industrial employee. A WORKER BEE is a non-reproductive female bee. To make a BEELINE is to go directly towards something.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["WRECKING", "BALL", "PARK", "RANGE", "ROVER", "SEAT", "WARMER", "CLIMATE", "CHANGE"],
        narrative: "A WRECKING BALL is used for demolition. A BALLPARK is where baseball is played. PARK RANGE is the name of a mountain range in Colorado. A RANGE ROVER is a luxury SUV. A ROVER has a driver's SEAT. A SEAT WARMER is a car feature. A change in weather patterns is CLIMATE CHANGE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GRAND", "THEFT", "AUTO", "IMMUNE", "SYSTEM", "SHOCK", "THERAPY", "SESSION", "ALE"],
        narrative: "GRAND THEFT is a major crime. GRAND THEFT AUTO is a video game. An AUTOIMMUNE disease attacks the body. The IMMUNE SYSTEM protects against disease. A SYSTEM SHOCK can cause a crash. SHOCK THERAPY is a medical treatment. A THERAPY SESSION is an appointment with a therapist. A SESSION ALE is a low-alcohol beer.",
        difficulty: 'EASY'
    },
    {
        solution: ["VICTORIA", "SECRET", "SERVICE", "DOG", "TAG", "ALONG", "CAME", "POLLY", "POCKET"],
        narrative: "VICTORIA'S SECRET is a lingerie brand. The SECRET SERVICE protects officials. A SERVICE DOG is a trained assistance animal. A DOG TAG is for identification. To TAG ALONG is to join others. ALONG CAME POLLY is a romantic comedy. A POLLY POCKET is a brand of small dolls.",
        difficulty: 'HARD'
    },
    {
        solution: ["SILENCE", "LAMBS", "WOOL", "GATHERING", "STORM", "FRONT", "DOOR", "MAN", "BUN"],
        narrative: "THE SILENCE OF THE LAMBS is a famous thriller film. LAMBSWOOL is a soft wool. A WOOL GATHERING is a daydream. A GATHERING STORM is an approaching problem. A STORM FRONT is the boundary of a storm. A FRONT DOOR is a main entrance. A DOORMAN is a staff member at a building. A MAN BUN is a hairstyle.",
        difficulty: 'HARD'
    },
    {
        solution: ["WALK", "SHAME", "GAME", "THEORY", "TEST", "DRIVE", "SHAFT", "COLLAR", "BONE"],
        narrative: "The WALK OF SHAME is a walk home after a one-night stand. A SHAME GAME is a form of psychological manipulation. GAME THEORY is the study of strategic decision-making. A TEST DRIVE is for evaluating a vehicle. A DRIVE SHAFT is a component in a car. A SHAFT COLLAR is a mechanical part. Your COLLARBONE is a bone in your shoulder.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DOMINANT", "GENE", "POOL", "SHARK", "WEEK", "END", "GAME", "HEN", "PARTY"],
        narrative: "A DOMINANT GENE is expressed over a recessive gene. A GENE POOL is the stock of different genes. A POOL SHARK is a skilled billiards player. SHARK WEEK is a TV event. A WEEKEND is Saturday and Sunday. The ENDGAME is a final stage of a process. A GAME HEN is a small chicken. A bachelorette party is a HEN PARTY.",
        difficulty: 'HARD'
    },
    {
        solution: ["SPICE", "GIRLS", "NIGHT", "OUT", "TAKE", "HOME", "WORK", "STATION", "MASTER"],
        narrative: "The SPICE GIRLS was a famous pop group. A GIRLS' NIGHT is a social event. A NIGHT OUT is an evening of entertainment. An OUT-TAKE is a take that is not used in a film. A TAKE-HOME exam. HOMEWORK is schoolwork done at home. A WORKSTATION is a computer. A STATIONMASTER manages a train station.",
        difficulty: 'EASY'
    },
    {
        solution: ["FOOL", "PROOF", "READER", "GLASSES", "CASE", "LAW", "FIRM", "HANDSHAKE", "DEAL"],
        narrative: "Something that is FOOLPROOF is infallible. A PROOFREADER checks for errors. You use a READING GLASSES to see up close. A GLASSES CASE protects eyewear. CASE LAW is based on legal precedents. A LAW FIRM employs lawyers. A FIRM HANDSHAKE shows confidence. A HANDSHAKE DEAL is an informal agreement.",
        difficulty: 'HARD'
    },
    {
        solution: ["VIRTUAL", "REALITY", "TV", "GUIDE", "DOG", "PADDLE", "BOAT", "RACE", "CARD"],
        narrative: "VIRTUAL REALITY is a simulated experience. REALITY TV is a genre of television. The TV GUIDE is a magazine listing television programs. A GUIDE DOG assists the visually impaired. The DOG PADDLE is a simple swimming stroke. A PADDLE BOAT is a small watercraft. A BOAT RACE is a competition on water. A RACE CARD provides information about competitors.",
        difficulty: 'HARD'
    },
    {
        solution: ["DANCE", "FEVER", "DREAM", "TEAM", "SPIRIT", "GUIDE", "LINE", "ITEM", "VETO"],
        narrative: "DANCE FEVER is an overwhelming urge to dance. A FEVER DREAM is a vivid, often bizarre dream experienced during a fever. The DREAM TEAM was the 1992 U.S. Olympic basketball team. TEAM SPIRIT is the morale and camaraderie of a group. A SPIRIT GUIDE is a supernatural helper. A GUIDELINE is a rule or principle. A LINE ITEM is a specific entry in a budget. A line-ITEM VETO is the power to reject individual provisions of a bill.",
        difficulty: 'HARD'
    },
    {
        solution: ["STATE", "FAIR", "GAME", "CHANGING", "ROOM", "KEY", "LIME", "PIE", "CHART"],
        narrative: "A STATE FAIR is a public event. To be FAIR GAME is to be a legitimate target. A GAME-CHANGING event alters a situation. A CHANGING ROOM is for trying on clothes. You use a ROOM KEY to open a door. A KEY LIME is a type of citrus fruit. A famous dessert is KEY LIME PIE. A PIE CHART is a type of graph.",
        difficulty: 'HARD'
    },
    {
        solution: ["KILL", "BILL", "COLLECTOR", "ITEM", "NUMBER", "CRUNCH", "BAR", "STOOL", "PIGEON"],
        narrative: "KILL BILL is a famous film. A BILL COLLECTOR is a debt agent. A COLLECTOR'S ITEM is a rare object. An ITEM is identified by its ITEM NUMBER. A NUMBER CRUNCHER is an accountant. A CRUNCH BAR is a candy bar. A BAR STOOL is a tall chair. A STOOL PIGEON is an informant.",
        difficulty: 'HARD'
    },
    {
        solution: ["SOUP", "KITCHEN", "SINK", "SWIM", "TEAM", "CAPTAIN", "HOOK", "LINE", "SINKER"],
        narrative: "A SOUP KITCHEN serves the needy. You can have everything but the KITCHEN SINK. You can SINK OR SWIM. A SWIM TEAM is a competitive group. A TEAM CAPTAIN is a leader. CAPTAIN HOOK is a famous villain. To be completely tricked is to fall for something HOOK, LINE, AND SINKER.",
        difficulty: 'EASY'
    },
    {
        solution: ["BEER", "BELLY", "LAUGH", "TRACK", "STAR", "FRUIT", "PUNCH", "CARD", "HOLDER"],
        narrative: "A large stomach can be a BEER BELLY. A deep, hearty chuckle is a BELLY LAUGH. A LAUGH TRACK is used in sitcoms. A top athlete is a TRACK STAR. A tropical food is STARFRUIT. A sweet beverage is a FRUIT PUNCH. A PUNCH CARD stores data. A wallet is a CARD HOLDER.",
        difficulty: 'HARD'
    },
    {
        solution: ["BLIND", "SPOT", "CHECK", "BOOK", "COVER", "LETTER", "BOMB", "SCARE", "TACTICS"],
        narrative: "An area you can't see is a BLIND SPOT. A random inspection is a SPOT CHECK. You write payments in a CHECKBOOK. A BOOK COVER protects a book. A COVER LETTER accompanies a resume. An explosive device sent through the mail is a LETTER BOMB. A BOMB SCARE can cause an evacuation. Using fear to influence others is a SCARE TACTIC.",
        difficulty: 'EASY'
    },
    {
        solution: ["PUBLIC", "DOMAIN", "NAME", "CALLING", "CARD", "GAME", "SHOW", "HOST", "FAMILY"],
        narrative: "A creative work free for all to use is in the PUBLIC DOMAIN. A website address is a DOMAIN NAME. Insulting someone is NAME-CALLING. A small, personal card is a CALLING CARD. A CARD GAME is played with a deck of cards. A GAME SHOW is a televised competition. A SHOW HOST is the master of ceremonies. A HOST FAMILY provides lodging for a visitor.",
        difficulty: 'EASY'
    },
    {
        solution: ["SCREEN", "DOOR", "KNOB", "HILL", "BILLY", "GOAT", "CHEESE", "STEAK", "KNIFE"],
        narrative: "A SCREEN DOOR allows air in while keeping bugs out. A door has a DOORKNOB. KNOB HILL is a famous neighborhood in San Francisco. A HILLBILLY is a term for a rural person. A male goat is a BILLY GOAT. A soft, tangy cheese is GOAT CHEESE. A popular sandwich is a CHEESESTEAK. You cut meat with a STEAK KNIFE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SUGAR", "CUBE", "ROOT", "BEER", "GARDEN", "STATE", "PRISON", "BREAK", "DANCE"],
        narrative: "You can put a SUGAR CUBE in your coffee. The CUBE ROOT is a mathematical term. A classic soda is ROOT BEER. A BEER GARDEN is an outdoor drinking area. New Jersey is the GARDEN STATE. A facility for incarceration is a STATE PRISON. An escape from jail is a PRISON BREAK. A style of street dancing is BREAKDANCING.",
        difficulty: 'HARD'
    },
    {
        solution: ["FIXER", "UPPER", "HAND", "SOAP", "OPERA", "HOUSE", "WARMING", "TREND", "SETTER"],
        narrative: "A house needing repairs is a FIXER-UPPER. To have an advantage is to have the UPPER HAND. You wash with HAND SOAP. A dramatic serial is a SOAP OPERA. An OPERA HOUSE hosts performances. A party for a new home is a HOUSEWARMING. A general direction of change is a WARMING TREND. A person who starts fashions is a TRENDSETTER.",
        difficulty: 'HARD'
    },
    {
        solution: ["CROSS", "BOW", "TIE", "DYE", "PACK", "ANIMAL", "KINGDOM", "COME", "BACK"],
        narrative: "A CROSSBOW is a weapon. A formal neckwear is a BOW TIE. A colorful pattern is TIE-DYE. A security device that stains money is a DYE PACK. An animal used for labor is a PACK ANIMAL. The ANIMAL KINGDOM is a classification of life. The afterlife is referred to as KINGDOM COME. A resurgence in popularity is a COMEBACK.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TICKING", "CLOCK", "WISE", "GUY", "FRIEND", "SHIP", "YARD", "STICK", "BALL"],
        narrative: "A sense of urgency comes from a TICKING CLOCK. Moving in a circular direction is CLOCKWISE. A smart-aleck is a WISE GUY. A platonic male friend is a GUY FRIEND. The bond between friends is FRIENDSHIP. A place where ships are built is a SHIPYARD. A measuring tool is a YARDSTICK. A simple street game is STICKBALL.",
        difficulty: 'EASY'
    },
    {
        solution: ["DOUBLE", "TAKE", "DOWN", "SIDE", "BAR", "CODE", "WORD", "SEARCH", "ENGINE"],
        narrative: "A delayed reaction of surprise is a DOUBLE TAKE. A wrestling move is a TAKEDOWN. A negative aspect is a DOWNSIDE. A secondary item on a menu is a SIDEBAR. A scannable pattern is a BARCODE. A secret phrase is a CODEWORD. A puzzle with hidden words is a WORD SEARCH. You use a SEARCH ENGINE to find things online.",
        difficulty: 'EASY'
    },
    {
        solution: ["SICK", "DAY", "TRIP", "HAZARD", "PAY", "WALL", "PAPER", "TRAIL", "MIX"],
        narrative: "You take a SICK DAY when you are ill. A short vacation is a DAY TRIP. A potential source of danger is a TRIP HAZARD. Extra compensation for dangerous work is HAZARD PAY. A subscription service may have a PAYWALL. You decorate with WALLPAPER. You write on a piece of PAPER. A series of documents is a PAPER TRAIL. A snack of dried fruit and nuts is TRAIL MIX.",
        difficulty: 'EASY'
    },
    {
        solution: ["GUY", "WIRE", "TAP", "WATER", "COOLER", "HEAD", "WIND", "SOCK", "PUPPET"],
        narrative: "A GUY WIRE supports a structure. You can place a WIRE TAP to listen in. A faucet provides TAP WATER. A WATER COOLER is a common office feature. To remain calm is to have a COOLER HEAD. A plane can face a HEADWIND. A WINDSOCK shows wind direction. A hand-operated puppet is a SOCK PUPPET.",
        difficulty: 'EASY'
    },
    {
        solution: ["JUNK", "FOOD", "PROCESSOR", "CHIP", "SHOT", "GUN", "METAL", "GEAR", "STICK"],
        narrative: "Unhealthy snacks are JUNK FOOD. A FOOD PROCESSOR is a kitchen appliance. A computer has a PROCESSOR CHIP. A short, delicate golf stroke is a CHIP SHOT. A firearm is a SHOTGUN. A dark gray color is a GUNMETAL. A famous video game series is METAL GEAR. A manual transmission has a GEARSTICK.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["THINK", "TANK", "ENGINE", "BLOCK", "BUSTER", "SWORD", "FISH", "BOWL", "CUT"],
        narrative: "A research institute is a THINK TANK. Thomas is a famous TANK ENGINE. A car has an ENGINE BLOCK. A major hit movie is a BLOCKBUSTER. A very large sword, often in video games, is a BUSTER SWORD. A type of large marine fish is a SWORDFISH. You might keep a pet in a FISHBOWL. A very short hairstyle is a BOWL CUT.",
        difficulty: 'HARD'
    },
    {
        solution: ["FREE", "FALL", "OUT", "POST", "GAME", "FACE", "VALUE", "PROPOSITION", "BET"],
        narrative: "To drop without restraint is to FREE-FALL. Nuclear conflict can cause a FALLOUT. A remote station is an OUTPOST. An analysis after a sports match is a POST-GAME. You put on your GAME FACE to get serious. The price printed on something is its FACE VALUE. A key business concept is a VALUE PROPOSITION. A special wager is a PROPOSITION BET.",
        difficulty: 'HARD'
    },
    {
        solution: ["SLEEP", "WALKER", "BUSH", "FIRE", "WALL", "FLOWER", "BED", "SIDE", "KICK"],
        narrative: "A person who walks while asleep is a SLEEPWALKER. George WALKER Bush was a U.S. President. A wildfire is a BUSH FIRE. A security barrier on a network is a FIREWALL. A shy person at a party is a WALLFLOWER. You plant flowers in a FLOWER BED. A BEDSIDE table is next to a bed. A loyal companion is a SIDEKICK.",
        difficulty: 'HARD'
    },
    {
        solution: ["CASE", "SENSITIVE", "SKIN", "TIGHT", "ROPE", "BURN", "OUT", "LET", "DOWN"],
        narrative: "Passwords are often CASE-SENSITIVE. A person may have SENSITIVE SKIN. A form-fitting garment is SKIN-TIGHT. An acrobat performs on a TIGHTROPE. A friction injury from a rope is a ROPE BURN. A state of exhaustion is a BURNOUT. A place to rent something is an OUTLET. A disappointment is a LETDOWN.",
        difficulty: 'EASY'
    },
    {
        solution: ["AIR", "MAIL", "BAG", "PIPE", "DREAM", "BOAT", "SHOE", "LACE", "UP"],
        narrative: "A system for sending letters by plane is AIRMAIL. A carrier delivers a MAILBAG. A musical instrument is a BAGPIPE. An unrealistic hope is a PIPE DREAM. An romantic fantasy person is a DREAMBOAT. A casual slip-on shoe is a BOAT SHOE. You tie your shoes with a SHOELACE. To fasten footwear is to LACE UP.",
        difficulty: 'EASY'
    },
    {
        solution: ["BOOK", "SHELF", "LIFE", "STYLE", "GUIDE", "POST", "OFFICE", "SUPPLY", "CHAIN"],
        narrative: "You place a BOOK on a BOOKSHELF. The expiration date of a product is its SHELF LIFE. A person's way of living is their LIFESTYLE. A set of rules for branding is a STYLE GUIDE. A landmark used for navigation is a GUIDEPOST. You send letters from a POST OFFICE. A stapler is an OFFICE SUPPLY. A sequence of production is a SUPPLY CHAIN.",
        difficulty: 'EASY'
    },
    {
        solution: ["DEATH", "WISH", "BONE", "CHINA", "TOWN", "SQUARE", "DANCE", "PARTNER", "SHIP"],
        narrative: "A reckless desire for one's own demise is a DEATH WISH. You make a wish on a WISHBONE. A fine ceramic is BONE CHINA. A district with a large Chinese population is a CHINATOWN. A public gathering place is a TOWN SQUARE. A folk dance is a SQUARE DANCE. A person you dance with is a DANCE PARTNER. A business collaboration is a PARTNERSHIP.",
        difficulty: 'EASY'
    },
    {
        solution: ["ACID", "RAIN", "COAT", "RACK", "BRAIN", "STORM", "DRAIN", "PIPE", "CLEANER"],
        narrative: "Corrosive precipitation is ACID RAIN. You wear a RAINCOAT in a storm. You hang a coat on a COATRACK. To RACK YOUR BRAIN is to think hard. A sudden idea is a BRAINSTORM. A place for water runoff is a STORM DRAIN. Water flows through a DRAINPIPE. A flexible tool for cleaning is a PIPE CLEANER.",
        difficulty: 'EASY'
    },
    {
        solution: ["SECOND", "NATURE", "TRAIL", "HEAD", "ROOM", "TONE", "DEAF", "EARS", "WAX"],
        narrative: "A deeply ingrained skill is SECOND NATURE. A path through the wilderness is a NATURE TRAIL. The start of a path is the TRAILHEAD. The space above your head is HEADROOM. The ambient sound of a location is ROOM TONE. To be unable to hear pitch is to be TONE-DEAF. To ignore advice is for it to fall on DEAF EARS. A substance from the ear is EARWAX.",
        difficulty: 'HARD'
    },
    {
        solution: ["SNAKE", "EYES", "BROW", "BEAT", "POET", "LAUREATE", "DEGREE", "CELSIUS", "SCALE"],
        narrative: "Rolling two ones in dice is SNAKE EYES. The area above the eyes is the EYEBROW. To intimidate someone is to BROWBEAT them. A BEAT POET was part of a literary movement. An honored poet is a POET LAUREATE. A LAUREATE DEGREE is an honorary academic award. A temperature unit is DEGREE CELSIUS. The CELSIUS SCALE measures temperature.",
        difficulty: 'HARD'
    },
    {
        solution: ["BLIND", "FAITH", "HEALER", "TOUCH", "SCREEN", "PLAY", "PEN", "PAL", "SYSTEM"],
        narrative: "To trust without evidence is BLIND FAITH. A FAITH HEALER claims supernatural abilities. An intimate, therapeutic connection can be a HEALER'S TOUCH. A device's interface is a TOUCHSCREEN. A script for a movie is a SCREENPLAY. A child's enclosure is a PLAYPEN. A friend you correspond with is a PEN PAL. The PAL SYSTEM is a television encoding standard.",
        difficulty: 'HARD'
    },
    {
        solution: ["WISH", "LIST", "PRICE", "WAR", "PATH", "FINDER", "SCOPE", "CREEP", "SHOW"],
        narrative: "A list of desired items is a WISH LIST. The cost of an item is its LIST PRICE. An aggressive competition between companies is a PRICE WAR. A route of aggression is a WARPATH. A tool for navigation is a PATHFINDER. A rifle sight is a FINDER SCOPE. A project that grows uncontrollably is a victim of SCOPE CREEP. A bizarre or unsettling performance is a CREEPY SHOW or a CREEPSHOW.",
        difficulty: 'HARD'
    },
    {
        solution: ["WET", "SUIT", "PRESS", "RELEASE", "VALVE", "STEM", "CELL", "BLOCK", "PARTY"],
        narrative: "A garment for water sports is a WETSUIT. A device for pressing clothes is a SUIT PRESS. An official statement to the media is a PRESS RELEASE. A RELEASE VALVE is a safety device for venting pressure. A part of a tire is a VALVE STEM. A basic biological unit is a STEM CELL. A section of a prison is a CELL BLOCK. A neighborhood gathering is a BLOCK PARTY.",
        difficulty: 'HARD'
    },
    {
        solution: ["POWER", "NAP", "SACK", "RACE", "HORSE", "SENSE", "ORGAN", "TRANSPLANT", "REJECTION"],
        narrative: "A short, restorative sleep is a POWER NAP. A bag for camping supplies is a NAPSACK. A children's game is a SACK RACE. A horse bred for speed is a RACEHORSE. Practical wisdom is HORSE SENSE. The ear is a SENSE ORGAN. A medical procedure is an ORGAN TRANSPLANT. The body's immune response to a new organ is TRANSPLANT REJECTION.",
        difficulty: 'HARD'
    },
    {
        solution: ["ROCK", "BOTTOM", "FEEDER", "FISH", "TANK", "COMMANDER", "CHIEF", "JUSTICE", "LEAGUE"],
        narrative: "The lowest possible point is ROCK BOTTOM. A creature that scavenges for food is a BOTTOM FEEDER, while FEEDER FISH are fish to be eaten alive by larger predatory fish or reptiles. An aquarium is a FISH TANK. An officer in charge of a tank is a TANK COMMANDER. The president is the COMMANDER-IN-CHIEF. The head of the Supreme Court is the CHIEF JUSTICE. A team of DC superheroes is the JUSTICE LEAGUE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BABY", "MONITOR", "LIZARD", "BRAIN", "FREEZE", "FRAME", "RATE", "QUOTE", "BOOK"],
        narrative: "A device to listen to a baby is a BABY MONITOR. A MONITOR LIZARD is a large reptile. The primitive, instinctual part of our mind is the LIZARD BRAIN. A headache from cold food is a BRAIN FREEZE. A single image from a video is a FREEZE-FRAME. The speed at which video frames are shown is the FRAME RATE. An estimated price for a service is a RATE QUOTE. A book filled with famous sayings is a QUOTE BOOK.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BLACK", "HOLE", "SAW", "DUST", "BUNNY", "SLOPE", "STYLE", "SHEET", "CAKE"],
        narrative: "A region of spacetime is a BLACK HOLE. A tool for cutting holes is a HOLE SAW. The fine particles from sawing are SAWDUST. An accumulation of dust is a DUST BUNNY. A beginner's ski run is a BUNNY SLOPE. SLOPESTYLE is a freestyle, trick-based skiing or snowboarding event. A document for web design is a STYLE SHEET. A flat, rectangular cake is a SHEET CAKE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CORN", "MEAL", "WORM", "FARM", "AID", "STATION", "BREAK", "DANCER", "POSE"],
        narrative: "A coarse flour from maize is CORNMEAL. A larva that eats meal is a MEALWORM. You can raise worms at a WORM FARM. A benefit concert for farmers is FARM AID. A place for medical help is a AID STATION. A pause in broadcasting is a STATION BREAK. A style of street dance is a BREAKDANCER. A specific stance is a DANCER'S POSE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DOUBLE", "CROSS", "COUNTRY", "CLUB", "HOUSE", "WINE", "TASTING", "MENU", "BAR"],
        narrative: "To betray someone is to DOUBLE-CROSS. A long-distance race is CROSS-COUNTRY. A social and recreational facility is a COUNTRY CLUB. A building for club members is a CLUBHOUSE. A restaurant's standard wine is HOUSE WINE. An event to sample wines is a WINE TASTING. A special, multi-course meal is a TASTING MENU. The list of commands in an application is a MENU BAR.",
        difficulty: 'HARD'
    },
    {
        solution: ["PAPER", "CUT", "GLASS", "CEILING", "FAN", "FICTION", "WRITER", "GUILD", "WARS"],
        narrative: "A minor injury from paper is a PAPER CUT. A decorative style of glass is CUT GLASS. An invisible barrier to advancement is a GLASS CEILING. A cooling appliance is a CEILING FAN. Stories created by enthusiasts are FAN FICTION. A person who writes stories is a FICTION WRITER. An association for writers is a WRITER'S GUILD. A famous video game is GUILD WARS.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CONTROL", "TOWER", "POWER", "STRIP", "MALL", "RAT", "KING", "PIN", "CUSHION"],
        narrative: "Air traffic is managed from a CONTROL TOWER. A TOWER of POWER signifies strength. A device with multiple electrical sockets is a POWER STRIP. A large, enclosed shopping center is a STRIP MALL. A frequent shopper is a MALL RAT. A mythical creature made of entangled rats is a RAT KING. A person or thing that is essential to the success of an organization is the KINGPIN. A small cushion for storing pins is a PINCUSHION.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["WISHING", "WELL", "SPRING", "CLEANING", "SUPPLY", "SIDE", "ARM", "CHAIR", "PERSON"],
        narrative: "A place to toss a coin and make a wish is a WISHING WELL. A source of fresh water is a WELLSPRING. A thorough cleaning of a house is SPRING CLEANING. A stock of items is a CLEANING SUPPLY. A secondary business or activity is a SUPPLY-SIDE operation. A handgun is a SIDEARM. A chair with supports for a person’s arms is an ARMCHAIR. The leader of a committee is a CHAIRPERSON.",
        difficulty: 'HARD'
    },
    {
        solution: ["PLASTIC", "SURGEON", "FISH", "HOOK", "WORM", "GEAR", "HEAD", "BAND", "SAW"],
        narrative: "A doctor who performs cosmetic surgery is a PLASTIC SURGEON. A type of fish is a SURGEONFISH. A bent piece of metal for catching fish is a FISHHOOK. A fishing lure can be a HOOKWORM. A type of mechanical gear is a WORM GEAR. A car's cylinder head is a GEARHEAD. A piece of headwear is a HEADBAND. A power tool with a long blade is a BANDSAW.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DIRT", "BIKE", "MESSENGER", "BAG", "CHECK", "LIST", "BROKER", "DEAL", "BREAKER"],
        narrative: "An off-road motorcycle is a DIRT BIKE. A person who delivers packages is a BIKE MESSENGER. A type of shoulder bag is a MESSENGER BAG. A place to leave your luggage is a BAG CHECK. A series of items to be remembered is a CHECKLIST. A person who arranges transactions is a LIST BROKER. A BROKER DEAL is a financial transaction. A person who ruins an agreement is a DEALBREAKER.",
        difficulty: 'HARD'
    },
    {
        solution: ["TRASH", "TALK", "SHOW", "PONY", "EXPRESS", "LANE", "BRYANT", "PARK", "BENCH"],
        narrative: "Athletes engage in TRASH TALK. Oprah hosted a famous TALK SHOW. An attention-seeker is a SHOW PONY. Old mail service was the PONY EXPRESS. Groceries have an EXPRESS LANE. A plus-size store is LANE BRYANT. New York has BRYANT PARK. You sit on a PARK BENCH.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["WILD", "CARD", "STOCK", "PHOTO", "BOMB", "SHELL", "SHOCK", "WAVE", "LENGTH"],
        narrative: "An unpredictable element is a WILD CARD. Heavy paper is CARDSTOCK. Generic images are STOCK PHOTOS. To unexpectedly appear is to PHOTOBOMB. Surprising news is a BOMBSHELL. Combat trauma causes SHELL SHOCK. An energy pulse is a SHOCK WAVE. Being on the same WAVELENGTH means understanding each other.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FORTUNE", "COOKIE", "MONSTER", "TRUCK", "BED", "ROCK", "CANDY", "LAND", "MINE"],
        narrative: "A dessert with a prediction is a FORTUNE COOKIE. Sesame Street has COOKIE MONSTER. A giant vehicle is a MONSTER TRUCK. The cargo area is a TRUCK BED. The Flintstones lived in BEDROCK. A sweet treat is ROCK CANDY. A children's board game is CANDY LAND. An explosive is a LAND MINE.",
        difficulty: 'HARD'
    },
    {
        solution: ["RUBBER", "STAMP", "COLLECTION", "AGENCY", "WORKER", "ANT", "HILL", "CLIMB", "RATE"],
        narrative: "To approve automatically is to RUBBER STAMP. Philatelists have a STAMP COLLECTION. Debt collectors are a COLLECTION AGENCY. A temp is an AGENCY WORKER. The colony has a WORKER ANT. Insects live in an ANT HILL. Motorsports feature HILL CLIMBS. Pilots measure their CLIMB RATE.",
        difficulty: 'HARD'
    },
    {
        solution: ["CHAIN", "LETTER", "OPENER", "HEART", "SURGERY", "CENTER", "STAGE", "FRIGHT", "NIGHT"],
        narrative: "A viral request is a CHAIN LETTER. You use a LETTER OPENER for mail. Cardiac procedures are OPEN-HEART SURGERY. A medical facility is a SURGERY CENTER. The spotlight is CENTER STAGE. Performance anxiety is STAGE FRIGHT. A scary movie is FRIGHT NIGHT.",
        difficulty: 'HARD'
    },
    {
        solution: ["STREET", "FIGHTER", "JET", "LAG", "BOLT", "ACTION", "MOVIE", "TICKET", "STUB"],
        narrative: "A popular fighting video game is STREET FIGHTER. A military aircraft is a FIGHTER JET. Fatigue after a long flight is JET LAG. A LAG BOLT is a heavy-duty wood screw. A type of firearm mechanism is BOLT-ACTION. An ACTION MOVIE is a film genre. You need a MOVIE TICKET to see a film. The remaining part is the TICKET STUB.",
        difficulty: 'HARD'
    },
    {
        solution: ["COFFEE", "TABLE", "TENNIS", "ELBOW", "GREASE", "MONKEY", "BUSINESS", "CASUAL", "FRIDAY"],
        narrative: "Living room furniture is a COFFEE TABLE. Ping-pong is TABLE TENNIS. A repetitive strain injury is TENNIS ELBOW. Hard work requires ELBOW GREASE. A mechanic is a GREASE MONKEY. Mischief is MONKEY BUSINESS. Dress code can be BUSINESS CASUAL. Dress-down day is CASUAL FRIDAY.",
        difficulty: 'HARD'
    },
    {
        solution: ["PANIC", "BUTTON", "DOWN", "TOWN", "HALL", "MONITOR", "SCREEN", "TIME", "CAPSULE"],
        narrative: "An emergency switch is a PANIC BUTTON. A shirt style is BUTTON-DOWN. The city center is DOWNTOWN. A public meeting place is a TOWN HALL. A student enforcer is a HALL MONITOR. A computer display is a MONITOR SCREEN. Kids need limits on SCREEN TIME. You bury a TIME CAPSULE for the future.",
        difficulty: 'HARD'
    },
    {
        solution: ["COMMON", "SENSE", "MEMORY", "LANE", "CHANGE", "COURSE", "CREDIT", "SCORE", "BOARD"],
        narrative: "COMMON SENSE is basic judgment. SENSE MEMORY is an acting technique using recalled sensations. MEMORY LANE is nostalgia. A LANE CHANGE is switching lanes. A COURSE CHANGE is altering direction. COURSE CREDIT is academic credit. A CREDIT SCORE is your financial rating. A game has a SCOREBOARD.",
        difficulty: 'HARD'
    },
    {
        solution: ["SLOW", "BURN", "NOTICE", "PERIOD", "DRAMA", "QUEEN", "SIZED", "BED", "SORES"],
        narrative: "A relationship that develops gradually is a SLOW BURN. To give your BURN NOTICE is to quit a job. A NOTICE PERIOD is the time between quitting and leaving. A PERIOD DRAMA is set in the past. A DRAMA QUEEN is overly theatrical. A bed can be QUEEN-SIZED. A SIZED BED is a standard mattress size. You can get BEDSORES from lying in bed too long.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["COLD", "BREW", "PUB", "CRAWL", "SPACE", "BAR", "HOPPER", "CAR", "SEAT"],
        narrative: "COLD BREW is coffee made without heat. A BREW PUB brews its own beer. A PUB CRAWL is a night of going bar to bar. A CRAWL SPACE is a narrow utility space under a building. The SPACE BAR is the wide key on a keyboard. A BAR HOPPER is someone who goes from bar to bar. A HOPPER CAR is a railroad freight car with unloading chutes. A safety seat for a child is a CAR SEAT.",
        difficulty: 'HARD'
    },
    {
        solution: ["TOUCH", "BASE", "CAMP", "COUNSELOR", "TRAINING", "DAY", "JOB", "POSTING", "BOARD"],
        narrative: "To TOUCH BASE is to check in. BASE CAMP is the staging camp on a climb/expedition. A CAMP COUNSELOR works with kids at camp. COUNSELOR TRAINING is what camps call prep for counselors. TRAINING DAY is onboarding (and a movie title. A DAY JOB is a person's main source of income. A JOB POSTING is the listing of an open role. You find jobs on a POSTING BOARD.",
        difficulty: 'HARD'
    },
    {
        solution: ["SHAME", "SPIRAL", "CUT", "LOOSE", "CANNON", "BALL", "GOWN", "FITTING", "PUNISHMENT"],
        narrative: "A SHAME SPIRAL is that self-loathing tumble after you did something “fun.” A SPIRAL CUT is a slicing style (think spiral-cut ham). To CUT LOOSE is to stop being polite and start being messy. A LOOSE CANNON is someone unpredictable, unfiltered, and usually one drink past advisable. A CANNONBALL is both pool-entry chaos and club-level bass. A BALL GOWN is formal fantasy dressing. A GOWN FITTING is where they pin and tuck you until it’s perfect (or can’t breathe, same thing). A FITTING PUNISHMENT is a consequence that matches the deed.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TEXT", "ALERT", "LEVEL", "BEST", "FRIEND", "ZONE", "OUT", "LATE", "NIGHT"],
        narrative: "A TEXT ALERT is a push notification to your phone. An ALERT LEVEL is how serious the situation supposedly is. Your LEVEL BEST is the absolute best effort you can give. A BEST FRIEND is your person, your emergency contact, your alibi. The FRIEND ZONE is where romantic tension goes to die politely. To ZONE OUT is to mentally peace out while still technically “here.” To be OUT LATE is to stay somewhere past a reasonable hour. A LATE NIGHT is that after-midnight window where judgment loosens.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["THOUGHT", "LEADER", "SHIP", "SHAPE", "SHIFTER", "KNOB", "CREEK", "BED", "ROOM"],
        narrative: "An influential expert is a THOUGHT LEADER. A LEADER manages a SHIP. A boat has a SHIP-SHAPE. A mythical being is a SHAPE-SHIFTER. A gear SHIFTER has a KNOB. A small stream is a KNOB CREEK (and a brand of bourbon). A stream has a CREEK BED. A place where you sleep is a BEDROOM.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MAIN", "CHARACTER", "ARC", "WELDING", "TORCH", "SONG", "LYRIC", "VIDEO", "CHAT"],
        narrative: "Someone with MAIN CHARACTER energy is the center of attention. A character in a story has a CHARACTER ARC. ARC WELDING is a fabrication process. A WELDING TORCH is a tool for joining metal. A sad, emotional ballad is a TORCH SONG. A SONG has a LYRIC. A music video with words on screen is a LYRIC VIDEO. You connect with friends over a VIDEO CHAT.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SPOILER", "ALERT", "SYSTEM", "ADMIN", "PASSWORD", "PROTECTED", "SPECIES", "ACT", "OUT"],
        narrative: "A SPOILER ALERT is a warning before revealing plot details. An ALERT SYSTEM notifies people of emergencies. A network is managed by a SYSTEM ADMIN. An admin has a secure PASSWORD. An account can be PASSWORD-PROTECTED. An endangered animal is a PROTECTED SPECIES. The Endangered SPECIES ACT is a law. To behave badly is to ACT OUT.",
        difficulty: 'HARD'
    },
    {
        solution: ["BINGE", "WATCH", "LIST", "MAKER", "MOVEMENT", "DETECTOR", "BEAM", "SPLITTER", "CABLE"],
        narrative: "To BINGE-WATCH a series is to view many episodes at once. A WATCHLIST is a list of items to monitor. A LIST MAKER is an organized person. The MAKER MOVEMENT is a tech-influenced DIY culture. A MOVEMENT DETECTOR is a security device. A laser has a DETECTOR BEAM. An optical device that divides a beam of light is a BEAM SPLITTER. A device that divides a signal for television or internet is a CABLE SPLITTER.",
        difficulty: 'HARD'
    },
    {
        solution: ["JUNK", "DRAWER", "HANDLE", "BAR", "TAB", "KEY", "SIGNATURE", "MOVE", "ABLE"],
        narrative: "A JUNK DRAWER is for miscellaneous items. A drawer has a DRAWER HANDLE. A bicycle has a HANDLEBAR. You run up a BAR TAB. The TAB KEY is on a keyboard. A musical notation is a KEY SIGNATURE. A distinctive maneuver is a SIGNATURE MOVE. A MOVEABLE FEAST is a celebrated novel.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CHEAP", "SHOT", "GLASS", "EYE", "CONTACT", "LENS", "CAP", "GUN", "SHOW"],
        narrative: "A mean-spirited remark is a CHEAP SHOT. You drink from a SHOT GLASS. An artificial eye is a GLASS EYE. To look at someone is to make EYE CONTACT. You wear a CONTACT LENS to see. A camera has a LENS CAP. A toy firearm is a CAP GUN. An exhibition of firearms is a GUN SHOW.",
        difficulty: 'EASY'
    },
    {
        solution: ["INBOX", "ZERO", "SUM", "TOTAL", "RECALL", "VOTE", "BANK", "SHOT", "CLOCK"],
        narrative: "A productivity goal is INBOX ZERO. A game where one person's gain is another's loss is a ZERO-SUM game. The final amount is the SUM TOTAL. A classic sci-fi film is TOTAL RECALL. An election to remove an official is a RECALL VOTE. A group of committed voters is a VOTE BANK. A billiards shot off a cushion is a BANK SHOT. In basketball, you must beat the SHOT CLOCK.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GYM", "CLASS", "TRIP", "ADVISOR", "BOARD", "SHORT", "STACK", "OVERFLOW", "CHART"],
        narrative: "A physical education course is GYM CLASS. A school outing is a CLASS TRIP. You check reviews on TRIPADVISOR. A company has an ADVISOR BOARD. A style of swimwear is a BOARD SHORT. A serving of pancakes is a SHORT STACK. A programming error is a STACK OVERFLOW. A visual representation of a FLOW CHART.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["RADICAL", "HONESTY", "POLICY", "DEBATE", "TEAM", "JERSEY", "SHORE", "LEAVE", "IT"],
        narrative: "A practice of complete truthfulness is RADICAL HONESTY. An HONESTY POLICY is a code of conduct. A formal argument is a POLICY DEBATE. A school has a DEBATE TEAM. An athlete wears a TEAM JERSEY. A reality TV show is \"JERSEY SHORE\". A sailor's vacation is SHORE LEAVE. The end of the phrase is \"leave it.\"",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["NEPO", "BABY", "PROOF", "CONCEPT", "ART", "DEALER", "CHOICE", "WORDS", "SMITH"],
        narrative: "A celebrity's child is a NEPO BABY. You BABY-PROOF a house for safety. A test of a new idea is a PROOF OF CONCEPT. Early drawings for a project are CONCEPT ART. An ART DEALER buys and sells art. \"DEALER'S CHOICE\" means the dealer picks the game. To speak carefully is to use CHOICE WORDS. A skilled writer is a WORDSMITH.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["RED", "FLAG", "FOOTBALL", "HELMET", "LAW", "SCHOOL", "THOUGHT", "BUBBLE", "TEA"],
        narrative: "A warning sign is a RED FLAG. A non-contact version of the sport is FLAG FOOTBALL. A FOOTBALL HELMET is protective gear. You go to LAW SCHOOL to become a lawyer. A particular way of thinking is a SCHOOL OF THOUGHT. A character's thoughts are shown in a THOUGHT BUBBLE. A popular drink is BUBBLE TEA.",
        difficulty: 'EASY'
    },
    {
        solution: ["DARK", "PATTERN", "RECOGNITION", "SOFTWARE", "UPDATE", "STATUS", "SYMBOL", "LOGIC", "BOMB"],
        narrative: "A deceptive user interface is a DARK PATTERN. AI uses PATTERN RECOGNITION. RECOGNITION SOFTWARE can identify faces. You get a SOFTWARE UPDATE on your phone. You post a STATUS UPDATE on social media. A luxury item is a STATUS SYMBOL. Formal reasoning is SYMBOLIC LOGIC. A malicious piece of code is a LOGIC BOMB.",
        difficulty: 'HARD'
    },
    {
        solution: ["DEEP", "FAKE", "ID", "THEFT", "PROTECTION", "RACKET", "SPORT", "UTILITY", "PLAYER"],
        narrative: "A manipulated video is a DEEP FAKE. A minor might use a FAKE ID. IDENTITY THEFT is a serious crime. You buy THEFT PROTECTION for your car. A criminal enterprise is a PROTECTION RACKET. Tennis is a RACKET SPORT. An SUV is a SPORT UTILITY vehicle. An athlete who plays multiple positions is a UTILITY PLAYER.",
        difficulty: 'HARD'
    },
    {
        solution: ["DOOMSDAY", "CLOCK", "RADIO", "WAVES", "POOL", "CUE", "BALL", "CHAIN", "SMOKER"],
        narrative: "The DOOMSDAY CLOCK symbolizes global catastrophe. A CLOCK RADIO is a bedroom appliance. RADIO WAVES transmit signals. An artificial wave generator is in a WAVE POOL. You use a POOL CUE in billiards. The white ball is the CUE BALL. A restraint for a prisoner is a BALL AND CHAIN. A person who smokes constantly is a CHAIN SMOKER.",
        difficulty: 'EASY'
    },
    {
        solution: ["BLOOD", "MONEY", "LAUNDERING", "DETERGENT", "POD", "CAST", "IRON", "LUNG", "CAPACITY"],
        narrative: "Money obtained unethically is BLOOD MONEY. Concealing the origin of money is MONEY LAUNDERING. LAUNDERING DETERGENT cleans clothes. A single-use soap unit is a DETERGENT POD. A podcast is a PODCAST. A heavy-duty skillet is made of CAST IRON. An old medical device for respiration is an IRON LUNG. The amount of air your lungs can hold is your LUNG CAPACITY.",
        difficulty: 'HARD'
    },
    {
        solution: ["STEP", "SISTER", "ACT", "TWO", "FACE", "MASK", "MANDATE", "LETTER", "GRADE"],
        narrative: "A sibling by marriage is a STEPSISTER. A famous movie is SISTER ACT. A play has an ACT TWO. A deceitful person is TWO-FACED. You wear a FACE MASK for protection. A government order is a MASK MANDATE. A formal decree is a MANDATE LETTER. A score for schoolwork is a LETTER GRADE.",
        difficulty: 'HARD'
    },
    {
        solution: ["TROPHY", "WIFE", "SWAP", "MEET", "HEAD", "CHEESE", "WHIZ", "KID", "FRIENDLY"],
        narrative: "A wealthy person's attractive spouse is a TROPHY WIFE. A reality show concept is a WIFE SWAP. A place to buy and sell used goods is a SWAP MEET. A muscular, dense person is a MEATHEAD. A cold meat jelly made from a pig’s head is HEAD CHEESE. A popular brand of processed cheese sauce is CHEESE WHIZ. A young, brilliant person is a WHIZ KID. Something suitable for children is KID-FRIENDLY.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GOAT", "YOGA", "FLAME", "WAR", "GAMES", "WORKSHOP", "CLASS", "CONSCIOUS", "UNCOUPLING"],
        narrative: "The slang for \"Greatest Of All Time\" is GOAT. A trendy exercise is GOAT YOGA. A move in the video game 'Street Fighter' is a YOGA FLAME. An online argument is a FLAME WAR. A classic 80s movie is \"WARGAMES\". A company that makes tabletop games is GAMES WORKSHOP. You can take a WORKSHOP CLASS. Being aware of social strata is being CLASS-CONSCIOUS. A celebrity term for a breakup is CONSCIOUS UNCOUPLING.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["OPEN", "MIC", "DROP", "BOX", "SET", "PIECE", "RATE", "LIMIT", "BREAK"],
        narrative: "An OPEN MIC is a live free-for-all, which cues MIC DROP, the emphatic finish. DROP BOX is the physical collection bin, BOX SET is a media bundle, and a scripted SET PIECE anchors a scene. PIECE RATE is pay per unit, RATE LIMIT caps throughput, and LIMIT BREAK is that explosive RPG power-up—one dumb thing leading to another all the way through.",
        difficulty: 'HARD'
    },
    {
        solution: ["CROWN", "ROYAL", "FLUSH", "TOILET", "PAPER", "TIGER", "EYE", "LASH", "OUT"],
        narrative: "A monarch wears a CROWN. A brand of Canadian whisky is CROWN ROYAL. The best hand in poker is a ROYAL FLUSH. You FLUSH the TOILET. A bathroom essential is TOILET PAPER. A person who seems threatening but is not is a PAPER TIGER. A golden-brown gemstone is a TIGER'S EYE. An eyelash is an EYELASH. To attack someone verbally is to LASH OUT.",
        difficulty: 'HARD'
    },
    {
        solution: ["SHORT", "CIRCUIT", "BREAKER", "BOX", "SPRING", "WATER", "BOTTLE", "CAP", "OFF"],
        narrative: "An electrical fault is a SHORT CIRCUIT. A safety device in your home is a CIRCUIT BREAKER, located in a BREAKER BOX. A mattress rests on a BOX SPRING. Natural water from the ground is SPRING WATER, often sold in a WATER BOTTLE. The bottle is sealed with a BOTTLE CAP. To open it, you take the CAP OFF.",
        difficulty: 'EASY'
    },
    {
        solution: ["BACK", "END", "USER", "FRIENDLY", "GROUP", "THINK", "FAST", "TRACK", "SUIT"],
        narrative: "The server-side of an application is the BACK-END. The person interacting with the software is the END-USER. A well-designed program is USER-FRIENDLY. A casual social gathering is a FRIENDLY GROUP. A psychological phenomenon where people conform is GROUPTHINK. To react quickly is to THINK FAST. An accelerated path to success is the FAST TRACK. An athlete wears a TRACKSUIT.",
        difficulty: 'HARD'
    },
    {
        solution: ["FLASH", "LIGHT", "YEAR", "BOOK", "VALUE", "ADDED", "BONUS", "ROUND", "TRIP"],
        narrative: "You use a FLASHLIGHT in the dark. A vast astronomical distance is a LIGHT-YEAR. A high school publishes an annual YEARBOOK. The assessed worth of a company is its BOOK VALUE. A feature that improves a product is VALUE-ADDED. An extra perk can be an ADDED BONUS. A special stage in a game is a BONUS ROUND. A journey to a place and back again is a ROUND TRIP.",
        difficulty: 'HARD'
    },
    {
        solution: ["FULL", "MOON", "LIGHT", "RAIL", "GUARD", "TOWER", "BRIDGE", "LOAN", "SHARK"],
        narrative: "The brightest lunar phase is a FULL MOON. The illumination it provides is MOONLIGHT. A form of urban public transit is LIGHT RAIL. A safety barrier is a RAIL GUARD. A GUARD TOWER provides a high vantage point. A famous London landmark is the TOWER BRIDGE. A short-term financing option is a BRIDGE LOAN. A predatory lender is a LOAN SHARK.",
        difficulty: 'HARD'
    },
    {
        solution: ["LOST", "PROPERTY", "TAX", "RETURN", "TRIP", "UP", "STAGE", "LIGHT", "WEIGHT"],
        narrative: "An office for misplaced items is LOST PROPERTY. Homeowners pay PROPERTY TAX. At the end of the year, you file a TAX RETURN. A journey to a location and back is a RETURN TRIP. To stumble over something is to TRIP UP. To outshine a fellow performer is to UPSTAGE them. A theater needs STAGE LIGHTS. A boxing division is a LIGHTWEIGHT class.",
        difficulty: 'EASY'
    },
    {
        solution: ["SHORT", "STOP", "SIGN", "LANGUAGE", "BARRIER", "CREAM", "SODA", "FOUNTAIN", "PEN"],
        narrative: "In baseball, the infielder between second and third base is the SHORTSTOP. A red octagon that controls traffic is a STOP SIGN. A visual language used by the deaf community is SIGN LANGUAGE. Not knowing the local tongue creates a LANGUAGE BARRIER. A BARRIER CREAM is used to protect skin from irritants. A classic sweet beverage is CREAM SODA, often served at an old-fashioned SODA FOUNTAIN. A timeless writing instrument that uses liquid ink is a FOUNTAIN PEN.",
        difficulty: 'EASY'
    },
    {
        solution: ["GOOD", "NEWS", "CAST", "MEMBER", "CARD", "DECK", "CHAIR", "LIFT", "GATE"],
        narrative: "Receiving positive information is GOOD NEWS. A television news broadcast is a NEWSCAST. An actor in a play or film is a CAST MEMBER. A club issues a MEMBERSHIP CARD to show you belong. A CARD DECK is used for playing games. A portable seat for lounging outdoors is a DECK CHAIR. A ski resort uses a CHAIRLIFT to get skiers up the mountain. An SUV often has a rear door that opens upwards, known as a LIFTGATE.",
        difficulty: 'EASY'
    },
    {
        solution: ["FREE", "HAND", "HELD", "HOSTAGE", "SITUATION", "COMEDY", "CLUB", "FOOT", "LOCKER"],
        narrative: "To have complete control and freedom is to have FREE HAND. A portable device that fits in your hand is HANDHELD. To be captured against your will is to be HELD HOSTAGE. A tense crisis involving captives is a HOSTAGE SITUATION. A TV genre, also known as a sitcom, is a SITUATION COMEDY. Stand-up performers work at a COMEDY CLUB. A congenital foot deformity is CLUBFOOT. A FOOTLOCKER is a large chest for storage, often kept at the foot of a bed.",
        difficulty: 'HARD'
    },
    {
        solution: ["BLACK", "BOARD", "MEMBER", "STATE", "PARKS", "DEPARTMENT", "STORE", "ROOM", "DIVIDER"],
        narrative: "A teacher writes on a BLACKBOARD with chalk. A company is governed by a BOARD MEMBER. A country that is part of the United Nations is a MEMBER STATE. A protected natural area for public use is a STATE PARK, which is managed by the PARKS DEPARTMENT. A large retail outlet that sells a wide variety of goods is a DEPARTMENT STORE. A STOREROOM holds inventory. You can separate a large space with a ROOM DIVIDER.",
        difficulty: 'EASY'
    },
    {
        solution: ["COMMON", "LAW", "SUIT", "CASE", "WORKER", "CLASS", "ACT", "FAST", "BALL"],
        narrative: "COMMON LAW is a legal system based on judicial precedent rather than statutes. A legal action taken by one person against another is a LAWSUIT. You pack for a trip in a SUITCASE. A social services professional who helps families is a CASEWORKER. A socioeconomic group based on employment is the WORKING CLASS. A person with great style and integrity is a true CLASS ACT. To respond quickly is to ACT FAST. A pitcher's speediest pitch is a FASTBALL.",
        difficulty: 'HARD'
    },
    {
        solution: ["ORANGE", "CRUSH", "DEPTH", "PERCEPTION", "MANAGEMENT", "TEAM", "AMERICA", "FIRST", "LOVE"],
        narrative: "A popular brand of orange-flavored soda is ORANGE CRUSH. In naval terms, the depth at which a submarine's hull will collapse is its CRUSH DEPTH. The ability to judge the distance of objects is DEPTH PERCEPTION. The practice of influencing public opinion is known as PERCEPTION MANAGEMENT. The executives who run a company form the MANAGEMENT TEAM. TEAM AMERICA is a famous satirical puppet film. AMERICA FIRST is a well-known political slogan. A person's initial experience of romantic love is their FIRST LOVE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BLOOD", "MOON", "RIVER", "PHOENIX", "RISING", "TIDE", "POOL", "HUSTLER", "MAGAZINE"],
        narrative: "A total lunar eclipse is a BLOOD MOON. A classic song is 'MOON RIVER'. A famous actor was RIVER PHOENIX. The mythical PHOENIX is known for RISING from the ashes. An incoming tide is a RISING TIDE. A rocky shore might have a TIDE POOL. A skilled billiards player is a POOL HUSTLER. An adult publication is HUSTLER MAGAZINE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BOSOM", "FRIEND", "REQUEST", "ACCESS", "DENIED", "JUSTICE", "SERVED", "COLD", "SHOULDER"],
        narrative: "An old term for a very close friend is a BOSOM FRIEND. On social media, you send a FRIEND REQUEST. You might need to REQUEST ACCESS to a private account. If rejected, your ACCESS is DENIED. An unfair legal outcome is to be DENIED JUSTICE. When a fair outcome is reached, JUSTICE is SERVED. Revenge is a dish best SERVED COLD. To ignore someone is to give them the COLD SHOULDER.",
        difficulty: 'EASY'
    },
    {
        solution: ["BUTT", "DIAL", "OPERATOR", "ASSISTANCE", "PROGRAM", "NOTES", "APP", "CRASH", "CART"],
        narrative: "To accidentally call someone with your phone is to BUTT-DIAL. In the past, you would DIAL the OPERATOR for help. An operator provides OPERATOR ASSISTANCE. A government aid plan is an ASSISTANCE PROGRAM. A booklet at a concert contains PROGRAM NOTES. You can jot down ideas in a NOTES APP. A software malfunction is an APP CRASH. A hospital has a CRASH CART for medical emergencies.",
        difficulty: 'EASY'
    },
    {
        solution: ["BALD", "TIRE", "PRESSURE", "POINT", "MAN", "MADE", "WHOLE", "PICTURE", "BOOK"],
        narrative: "A tire with worn-out tread is a BALD TIRE. You check your TIRE PRESSURE for safety. A sensitive area on the body is a PRESSURE POINT. The lead person on a project is the POINT MAN. An artificial object is MAN-MADE. To be fully compensated after a loss is to be MADE WHOLE. Understanding the full context is seeing the WHOLE PICTURE. A children's book with lots of illustrations is a PICTURE BOOK.",
        difficulty: 'EASY'
    },
    {
        solution: ["BILLION", "DOLLAR", "TREE", "TRUNK", "SHOW", "RUNNER", "RUG", "PULL", "APART"],
        narrative: "A massive enterprise is a BILLION-DOLLAR business. A popular discount store is the DOLLAR TREE. The main woody stem of a tree is its TREE TRUNK. A special event for previewing a fashion collection is a TRUNK SHOW. The head writer and executive producer of a TV series is the SHOWRUNNER. A long, narrow carpet for a hallway is a RUNNER RUG. A sudden scam or withdrawal of support is a RUG PULL. A type of shareable bread is PULL-APART bread.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SPIELBERG", "MOVIE", "POPCORN", "CEILING", "TILE", "FLOOR", "LAMP", "OIL", "SPILL"],
        narrative: "Steven SPIELBERG is a famous MOVIE director. A classic snack at the movies is POPCORN. A textured finish on a ceiling is a POPCORN CEILING. A drop ceiling is made of CEILING TILE. A common bathroom surface is a TILE FLOOR. A standing light is a FLOOR LAMP. An old-fashioned lamp burns LAMP OIL. A major environmental disaster is an OIL SPILL.",
        difficulty: 'HARD'
    },
    {
        solution: ["CHOP", "SHOP", "LOCAL", "NEWS", "CYCLE", "PHASE", "SHIFT", "FATIGUE", "GREEN"],
        narrative: "A place where stolen cars are dismantled is a CHOP SHOP. A movement to support community businesses is to SHOP LOCAL. Your city's daily broadcast is the LOCAL NEWS. The 24-hour media coverage of an event is the NEWS CYCLE. The menstrual cycle has four distinct CYCLE PHASES. In physics, a change in a waveform is a PHASE SHIFT. Exhaustion from irregular work hours is SHIFT FATIGUE. A dull, olive color used in military clothing is FATIGUE GREEN.",
        difficulty: 'HARD'
    },
    {
        solution: ["DEBASE", "CURRENCY", "CRISIS", "CENTER", "FIELD", "OFFICE", "ROMANCE", "GENRE", "BOUNDARIES"],
        narrative: "To lower the value of a nation's money is to DEBASE the CURRENCY. A sudden devaluation can trigger a CURRENCY CRISIS. A facility offering support during emergencies is a CRISIS CENTER. In baseball, the central area of the outfield is CENTER FIELD. A company's local or remote branch is a FIELD OFFICE. A relationship between coworkers is an OFFICE ROMANCE. A major category of fiction is the ROMANCE GENRE. The conventions that define a category of art are its GENRE BOUNDARIES.",
        difficulty: 'HARD'
    },
    {
        solution: ["SOUND", "WAVE", "OFF", "SET", "UP", "HILL", "TOP", "HAT", "BAND"],
        narrative: "Audio travels in a SOUND WAVE. To dismiss someone with a gesture is to WAVE them OFF. To balance or compensate for something is to OFFSET it. To arrange or construct is to SET UP. The difficult part of a journey is the UPHILL battle. The very peak of a hill is the HILLTOP. A formal piece of headwear is a TOP HAT, often decorated with a HAT BAND.",
        difficulty: 'EASY'
    },
    {
        solution: ["SWEET", "TALK", "RADIO", "STAR", "FISH", "FRY", "PAN", "HANDLE", "GRIP"],
        narrative: "To persuade with charming words is to SWEET-TALK someone. A broadcast format featuring audience calls is TALK RADIO. A very popular musician is a RADIO STAR. A marine creature with radial symmetry is a STARFISH. A social event featuring fried seafood is a FISH FRY. You cook in a FRYING PAN. To beg for money on the street is to PANHANDLE. A door has a HANDLE with a GRIP.",
        difficulty: 'EASY'
    },
    {
        solution: ["COLD", "FEET", "FIRST", "AID", "KIT", "BAG", "LADY", "BUG", "SPRAY"],
        narrative: "To get nervous before a big event is to get COLD FEET. The proper way to enter water is FEET FIRST. Emergency medical treatment is FIRST AID, found in an AID KIT. A simple duffel is a KITBAG. A common term for a homeless woman is a BAG LADY. A LADYBUG is an insect. To repel insects, you use BUG SPRAY.",
        difficulty: 'EASY'
    },
    {
        solution: ["ROUGH", "DRAFT", "BEER", "MUG", "SHOT", "CALLER", "ID", "BADGE", "HOLDER"],
        narrative: "An initial version of a document is a ROUGH DRAFT. DRAFT BEER is served from a keg into a BEER MUG. A police photograph of a suspect is a MUG SHOT. A person in charge who makes decisions is a SHOT-CALLER. Your phone displays CALLER ID. An employee wears an ID BADGE in a BADGE HOLDER.",
        difficulty: 'EASY'
    },
    {
        solution: ["WILD", "WEST", "COAST", "GUARD", "DUTY", "FREE", "SPEECH", "WRITER", "BLOCK"],
        narrative: "The American frontier is known as the WILD WEST. The region bordering the Pacific is the WEST COAST. The maritime service that protects our waters is the COAST GUARD. A soldier's assignment is GUARD DUTY. Goods exempt from import taxes are DUTY-FREE. A fundamental right is FREE SPEECH. A person who composes speeches is a SPEECHWRITER. A creative impasse is WRITER'S BLOCK.",
        difficulty: 'EASY'
    },
    {
        solution: ["FREE", "STYLE", "POINTS", "SYSTEM", "ERROR", "CODE", "RED", "CARPET", "BAGGER"],
        narrative: "A swimming stroke or an improvisational rap is FREESTYLE. Judges award STYLE POINTS for artistry. A competition uses a POINTS SYSTEM. A computer malfunction is a SYSTEM ERROR, which generates an ERROR CODE. A state of emergency is a CODE RED. Celebrities walk the RED CARPET. An outsider seeking political gain is a CARPETBAGGER.",
        difficulty: 'HARD'
    },
    {
        solution: ["BLUE", "JEANS", "JACKET", "POTATO", "CHIP", "OFF", "PEAK", "PERFORMANCE", "REVIEW"],
        narrative: "A classic pair of denim trousers is BLUE JEANS. A denim coat is a JEANS JACKET. A large baked potato is a JACKET POTATO. A classic snack is a POTATO CHIP. To break a small piece from something is to CHIP it OFF. The less busy time for travel or utilities is OFF-PEAK. An athlete's best achievement is their PEAK PERFORMANCE. An employee's work is evaluated in a PERFORMANCE REVIEW.",
        difficulty: 'EASY'
    },
    {
        solution: ["GRAND", "SLAM", "DOOR", "HANDLE", "BAG", "TAG", "SALE", "PRICE", "CUT"],
        narrative: "A major victory in tennis or baseball is a GRAND SLAM. To close a door forcefully is to SLAM the DOOR. You open a door with the DOOR HANDLE. A handbag can be called a HANDLEBAG. Luggage is identified with a BAG TAG. A yard sale can be called a TAG SALE. The discounted cost of an item is its SALE PRICE. A reduction in cost is a PRICE CUT.",
        difficulty: 'EASY'
    },
    {
        solution: ["COLD", "FRONT", "YARD", "ARM", "WRESTLE", "MATCH", "PLAY", "DOUGH", "NUT"],
        narrative: "A weather system that brings cool air is a COLD FRONT. The lawn before a house is the FRONT YARD. A crossbeam on a ship's mast is a YARDARM. A test of strength is to ARM-WRESTLE. A single bout is a WRESTLING MATCH. A golf scoring format is MATCH PLAY. A modeling compound for children is PLAY-DOUGH. A sweet, fried pastry is a DOUGHNUT.",
        difficulty: 'EASY'
    },
    {
        solution: ["FRONT", "OFFICE", "SPACE", "SHUTTLE", "BUS", "STOP", "GAP", "YEAR", "ROUND"],
        narrative: "The administrative department of a company is the FRONT OFFICE. A place to work is OFFICE SPACE. A reusable spacecraft is a SPACE SHUTTLE. A SHUTTLE BUS runs on a short route. Passengers wait at a BUS STOP. A temporary solution is a STOPGAP. A break from education is a GAP YEAR. An activity that happens all year is YEAR-ROUND.",
        difficulty: 'EASY'
    },
    {
        solution: ["ROUND", "TRIP", "WIRE", "FRAME", "HOUSE", "GUEST", "ROOM", "NUMBER", "ONE"],
        narrative: "A journey to a place and back again is a ROUND TRIP. An alarm can be triggered by a TRIPWIRE. A basic structural model of a design is a WIREFRAME. A building constructed with timber is a FRAME HOUSE. A visitor staying in your home is a HOUSEGUEST. You prepare a GUEST ROOM for them. The room is identified by a ROOM NUMBER. To be the best is to be NUMBER ONE.",
        difficulty: 'HARD'
    },
    {
        solution: ["DREAM", "SCAPE", "GOAT", "TEE", "SHIRT", "TAIL", "SPIN", "OFF", "SHOOT"],
        narrative: "An imaginary landscape is a DREAMSCAPE. A person blamed for others' faults is a SCAPEGOAT. A small, pointed beard is a GOATEE. A casual short-sleeved shirt is a T-SHIRT. The back bottom part of a shirt is its SHIRTTAIL. A rapid, spinning descent is a TAILSPIN. A new series derived from an existing one is a SPIN-OFF. A secondary branch of a business is an OFFSHOOT.",
        difficulty: 'EASY'
    },
    {
        solution: ["POWER", "DRILL", "BIT", "COIN", "FLIP", "SIDE", "SHOW", "DOWN", "FALL"],
        narrative: "A powerful tool for making holes is a POWER DRILL. The removable cutting part is a DRILL BIT. A famous cryptocurrency is BITCOIN. To make a decision by chance, you COIN FLIP. The other side of a coin is the FLIPSIDE. A secondary attraction at a carnival is a SIDESHOW. A dramatic confrontation is a SHOWDOWN. A rapid decline in status is a DOWNFALL.",
        difficulty: 'HARD'
    },
    {
        solution: ["GOLD", "FISH", "BOWL", "CUT", "AWAY", "MESSAGE", "PAD", "THAI", "FOOD"],
        narrative: "A common pet is a GOLDFISH, often kept in a FISHBOWL. A very short hairstyle is a BOWL CUT. In film, a CUTAWAY is a brief shot to a different scene. In the past, you'd leave an AWAY MESSAGE on instant messenger. You can jot down notes on a MESSAGE PAD. A popular cuisine is PAD THAI, a type of THAI FOOD.",
        difficulty: 'HARD'
    },
    {
        solution: ["HIGH", "FIVE", "GUYS", "NIGHT", "CAP", "SIZE", "MATTERS", "FACT", "CHECK"],
        narrative: "A celebratory gesture is a HIGH-FIVE. A popular burger chain is FIVE GUYS. A social evening for men is a GUYS' NIGHT. A final drink before bed is a NIGHTCAP. A boat can CAPSIZE if it overturns. The phrase SIZE MATTERS relates to importance. A common expression is 'as a MATTER OF FACT'. To verify information is to FACT-CHECK it.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GREEN", "HOUSE", "GAS", "MASK", "OFF", "LOAD", "BEARING", "WALL", "STREET"],
        narrative: "You grow plants in a GREENHOUSE. A home is heated with NATURAL GAS. A GAS MASK is for protection. A viral rap song was titled 'MASK OFF'. To transfer cargo is to OFFLOAD it. A structural wall that supports weight is a LOAD-BEARING wall. The financial district in New York is WALL STREET.",
        difficulty: 'HARD'
    },
    {
        solution: ["BLUE", "JAY", "WALKING", "TALL", "BOY", "HOOD", "RAT", "RACE", "TRACK"],
        narrative: "A vibrant North American bird is a BLUE JAY. To cross a street illegally is JAYWALKING. To be proud and confident is to be WALKING TALL. A large can of beer is a TALLBOY. The period of being a young male is BOYHOOD. A slang term for a young person from a rough neighborhood is a HOOD RAT. The endless, competitive struggle of modern life is the RAT RACE. You run on a RACETRACK.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SOFT", "WOOD", "PECKER", "HEAD", "RUSH", "JOB", "SEARCH", "PARTY", "LINE"],
        narrative: "Pine is a type of SOFTWOOD. A bird known for drilling into trees is a WOODPECKER. A foolish or stupid person is a PECKERHEAD. A sudden, intense feeling is a HEADRUSH. A task done quickly is a RUSH JOB. The process of looking for employment is a JOB SEARCH. A group organized to find someone is a SEARCH PARTY. A shared telephone connection is a PARTY LINE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BIRD", "SONG", "WRITER", "GUILD", "HALL", "PASS", "BOOK", "CASE", "STUDY"],
        narrative: "The sound a bird makes is a BIRDSONG. A person who composes music and lyrics is a SONGWRITER. An association of craftspeople is a WRITER'S GUILD. A GUILDHALL is a historic European building used to collect taxes. You need a HALL PASS to be in the corridor during class. A PASSBOOK is the depositor's book in which a bank records deposits and withdrawals. A container for books is a BOOKCASE. A detailed analysis of a person or event is a CASE STUDY.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["COUNTER", "TOP", "SPIN", "OFF", "ICE", "PICK", "POCKET", "LINT", "TRAP"],
        narrative: "A kitchen surface is a COUNTERTOP. A rotating toy is a TOP. A forward-moving rotation is a TOPSPIN. A new series derived from an existing one is a SPIN-OFF. OFF-ICE training is what hockey players and skaters do to build muscle. An ICE PICK is a pointed tool. To steal from a pocket is to PICKPOCKET. Tumble dryers have a LINT POCKET. A device for catching lint is a LINT TRAP.",
        difficulty: 'HARD'
    },
    {
        solution: ["AFTER", "LIFE", "BOAT", "HOUSE", "GUEST", "ROOM", "KEY", "CHAIN", "MAIL"],
        narrative: "An existence after death is the AFTERLIFE. A rescue vessel is a LIFEBOAT. A residence on the water is a BOATHOUSE. A person visiting a home is a HOUSEGUEST. A spare room for visitors is a GUEST ROOM. A ROOM KEY opens a door. A series of connected links is a KEYCHAIN. Armor made of interlocking rings is CHAIN MAIL.",
        difficulty: 'EASY'
    },
    {
        solution: ["WATER", "GATE", "KEEPER", "SECRET", "HANDSHAKE", "DEAL", "MAKER", "MARK", "TWAIN"],
        narrative: "A famous political scandal was WATERGATE. A person who guards an entrance is a GATEKEEPER. Someone entrusted with confidential information is a KEEPER OF SECRETS. A special greeting is a SECRET HANDSHAKE. A HANDSHAKE DEAL is a verbal agreement. A person who creates things is a DEALMAKER. A brand of bourbon is MAKER'S MARK. A famous American author was MARK TWAIN.",
        difficulty: 'HARD'
    },
    {
        solution: ["BIG", "PICTURE", "FRAME", "JOB", "INTERVIEW", "QUESTION", "ABLE", "BODIED", "PERSON"],
        narrative: "The overall perspective is the BIG PICTURE. A PICTURE FRAME surrounds an image. A dishonest scheme is a FRAME JOB. You have a JOB INTERVIEW to get hired. The hiring manager asks an INTERVIEW QUESTION. To be QUESTIONABLE is to be doubtful. A person without physical disability is ABLE-BODIED. An ABLE-BODIED PERSON can perform physical labor.",
        difficulty: 'EASY'
    },
    {
        solution: ["FASHION", "PLATE", "TECTONICS", "SHIFT", "KEY", "HOLDER", "PATTERN", "MAKER", "SPACE"],
        narrative: "A stylish person is a FASHION PLATE. The Earth's crust is made of PLATE TECTONICS. On a keyboard, you use the SHIFT KEY. A KEY HOLDER keeps your keys organized. A repeating design is a HOLDER PATTERN. A person who creates things is a PATTERNMAKER. A collaborative workshop is a MAKERSPACE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["LIGHT", "BEER", "GOGGLES", "CASE", "STUDY", "HALL", "PASS", "WORD", "PLAY"],
        narrative: "A low-calorie beer is a LIGHT BEER. The phenomenon of finding people more attractive after drinking is BEER GOGGLES. A protective container is a GOGGLES CASE. An in-depth analysis of a subject is a CASE STUDY. A school corridor is a STUDY HALL. You need a HALL PASS to be in the corridor. A secret phrase for entry is a PASSWORD. A witty use of language is WORDPLAY.",
        difficulty: 'HARD'
    },
    {
        solution: ["GOLDEN", "TICKET", "STUB", "TOE", "NAIL", "POLISH", "SAUSAGE", "ROLL", "OVER"],
        narrative: "Charlie found a GOLDEN TICKET to the chocolate factory. The remaining part of a ticket is the TICKET STUB. You can STUB your TOE. You have a TOENAIL on your toe. You can apply NAIL POLISH. A spiced meat from Poland is POLISH SAUSAGE. A savory pastry is a SAUSAGE ROLL. To carry a balance to the next period is to ROLL OVER.",
        difficulty: 'EASY'
    },
    {
        solution: ["DENTAL", "DAM", "NATION", "BUILDING", "CODE", "WORD", "GAME", "PLAN", "AHEAD"],
        narrative: "A DENTAL DAM is a protective sheet used in dentistry. DAMNATION refers to the state of being condemned to eternal punishment in hell. To strengthen a country's institutions is NATION-BUILDING. Construction is governed by a BUILDING CODE. A secret phrase is a CODEWORD. A fun game you're playing right now is a WORD GAME. A GAME PLAN is what you need to complete a goal, so you better PLAN AHEAD as part of your strategy.",
        difficulty: 'HARD'
    },
    {
        solution: ["GREEN", "ROOM", "SERVICE", "ANIMAL", "CRACKER", "JACK", "POT", "BELLY", "BUTTON"],
        narrative: "A waiting area for performers is a GREEN ROOM. Hotels offer ROOM SERVICE. A SERVICE ANIMAL provides assistance. A children's snack is an ANIMAL CRACKER. The CRACKER JACK prize is a classic. To win big is to hit the JACKPOT. A large, protruding stomach is a POTBELLY. Your navel is your BELLY BUTTON.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HAPPY", "FEET", "DRAG", "RACE", "TRACK", "RECORD", "PLAYER", "PIANO", "TUNER"],
        narrative: "A famous animated movie about penguins is HAPPY FEET. To be reluctant is to DRAG your FEET. An acceleration contest between two vehicles on a straight track is a DRAG RACE. You run on a RACETRACK. An athlete's best performance is a TRACK RECORD. You listen to music on a RECORD PLAYER. A classical instrument is a PLAYER PIANO. A person who adjusts instruments is a PIANO TUNER.",
        difficulty: 'HARD'
    },
    {
        solution: ["HARD", "HAT", "TRICK", "KNEE", "CAP", "LOCK", "SMITH", "COLLEGE", "TOWN"],
        narrative: "A construction worker wears a HARD HAT. A sporting achievement of three scores is a HAT TRICK. A TRICK KNEE is an unreliable joint. Your kneecap is a KNEECAP. A CAPSLOCK key types in all uppercase. A person who works with locks is a LOCKSMITH. A higher education institution is SMITH COLLEGE. A community centered around a university is a COLLEGE TOWN.",
        difficulty: 'HARD'
    },
    {
        solution: ["HIGH", "BROW", "BEAT", "BOX", "SEAT", "CUSHION", "CUT", "RATE", "HIKE"],
        narrative: "Intellectual or scholarly content is HIGHBROW. To intimidate someone is to BROWBEAT them. To listen to music on a BEATBOX. A premium ticket is a BOX SEAT. A chair has a SEAT CUSHION. A style of gemstone is a CUSHION CUT. A CUT-RATE price is discounted. A RATE HIKE increases interest.",
        difficulty: 'HARD'
    },
    {
        solution: ["FREE", "WAY", "SIDE", "BAR", "FLY", "PAPER", "WEIGHT", "LIFT", "TICKET"],
        narrative: "A major highway is a FREEWAY. A secondary road is a WAYSIDE. A small, secondary article in a magazine is a SIDEBAR. A BARFLY is a regular at a bar. Sticky paper for catching insects is FLYPAPER. A heavy object to hold down papers is a PAPERWEIGHT. You WEIGHTLIFT at the gym. A ticket for a ski lift is a LIFT TICKET.",
        difficulty: 'EASY'
    },
    {
        solution: ["SWEET", "SIXTEEN", "CANDLES", "LIGHT", "BEER", "BATTER", "RAM", "PAGE", "TURNER"],
        narrative: "A 16th birthday party is a SWEET SIXTEEN. A classic '80s movie is SIXTEEN CANDLES. CANDLELIGHT provides a soft glow. A LIGHT BEER has fewer calories. Fish can be coated in BEER BATTER. A battering RAM breaks down doors. A destructive, violent spree is a RAMPAGE. An exciting book is a PAGE-TURNER.",
        difficulty: 'HARD'
    },
    {
        solution: ["PUNCH", "BUGGY", "WHIP", "CREAM", "CHEESE", "CAKE", "WALK", "MAN", "POWER"],
        narrative: "The 'punch buggy' game involves spotting VW Beetles. A driver uses a BUGGY WHIP. WHIPPED CREAM is a dessert topping. CREAM CHEESE goes on a bagel. A rich dessert is a CHEESECAKE. An easy task is a CAKEWALK. A famous Sony personal audio device was the WALKMAN. The workforce of an organization is its MANPOWER.",
        difficulty: 'HARD'
    },
    {
        solution: ["WATER", "BED", "BUG", "OUT", "SIDE", "WALK", "WAY", "POINT", "GUARD"],
        narrative: "You can sleep on a WATERBED. A small insect is a BEDBUG. To BUG OUT is to leave quickly. The area beyond a building is the OUTSIDE. A paved path for pedestrians is a SIDEWALK. A pedestrian path is a WALKWAY. A specific location or coordinate is a WAYPOINT. A basketball position is a POINT GUARD. To stand watch is to be on GUARD duty.",
        difficulty: 'HARD'
    },
    {
        solution: ["KING", "ARTHUR", "MILLER", "TIME", "BOMB", "SQUAD", "CAR", "JACK", "HAMMER"],
        narrative: "A legendary British leader was KING ARTHUR. A celebrated American playwright was ARTHUR MILLER. A popular brand of American beer is MILLER TIME. A ticking explosive is a TIME BOMB. A specialized police unit is a BOMB SQUAD. A police vehicle is a SQUAD CAR. You lift a car with a CAR JACK. A powerful pneumatic tool is a JACKHAMMER.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GHOST", "WRITERS", "ROOM", "MATE", "GUARDING", "RAIL", "GUN", "POWDER", "KEG"],
        narrative: "People who write for others are GHOSTWRITERS. A TV writing staff workspace is the WRITERS' ROOM. You can have a ROOMMATE. A specific behavior in evolutionary biology is MATE GUARDING. A safety barrier is a GUARDING RAIL. A weapon that uses electromagnetic force is a RAILGUN. An explosive substance is GUNPOWDER. You store beer in a POWDER KEG.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DEATH", "STAR", "STRUCK", "GOLD", "STANDARD", "DEVIATION", "SEPTUM", "RING", "MASTER"],
        narrative: "The DEATH STAR is a famous space station from Star Wars. To be STARSTRUCK is to be overwhelmed by a celebrity. To STRIKE GOLD is to find success. The GOLD STANDARD was a monetary system. A statistical term is STANDARD DEVIATION. A DEVIATED SEPTUM is a medical condition. A SEPTUM RING is a piece of jewelry. The leader of a circus is the RINGMASTER.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["RUSTY", "TROMBONE", "SLIDE", "RULE", "THUMB", "WAR", "LOCK", "JAW", "BREAKER"],
        narrative: "A RUSTY TROMBONE is an infamous sexual act. A TROMBONE has a SLIDE. A SLIDE RULE is an old calculation tool. A RULE OF THUMB is a general principle. You can have a THUMB WAR. A WARLOCK is a male witch. LOCKJAW is a symptom of tetanus. A JAWBREAKER is a hard candy.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TEST", "PATTERN", "BALDNESS", "CURE", "ALL", "SPICE", "RACK", "FOCUS", "GROUP"],
        narrative: "A TEST PATTERN is displayed on a TV screen, and the Kobayashi Maru is an unwinnable TEST in Starfleet Academy. A type of hair loss is PATTERN BALDNESS. A hypothetical remedy is a CURE-ALL. ALLSPICE is a cooking spice. Spices are kept on a SPICE RACK. To RACK FOCUS is a filmmaking technique. A market research method is a FOCUS GROUP.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CLEVELAND", "STEAMER", "TRUNK", "CLUB", "MATE", "SELECTION", "SUNDAY", "PUNCH", "BOWL"],
        narrative: "A CLEVELAND STEAMER is a vulgar sexual act. A STEAMER TRUNK is a piece of luggage. TRUNK CLUB was a personal styling service. A brand of yerba mate is CLUB-MATE. An evolutionary concept is MATE SELECTION. The day NCAA tournament brackets are revealed is SELECTION SUNDAY. A SUNDAY PUNCH is a boxer's best blow. A PUNCH BOWL is for serving drinks at a party.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DIET", "SODA", "POP", "CULTURE", "SHOCK", "JOCK", "STRAP", "HANGER", "ON"],
        narrative: "A fizzy, sugar-free drink is DIET SODA. Another name for it is SODA POP. The trends and media of the day are POP CULTURE. The disorientation from a new environment is a CULTURE SHOCK. A provocative radio host is a SHOCK JOCK. An athletic supporter is a JOCK STRAP. A commuter who stands on a train is a STRAPHANGER. A person who lingers in a group where they're not welcome is a HANGER-ON.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FORD", "MUSTANG", "RANCH", "DRESSING", "DOWN", "PAYMENT", "PLAN", "B", "MOVIE"],
        narrative: "A classic American sports car is the FORD MUSTANG. A famous legal brothel in Nevada was the MUSTANG RANCH. A popular salad topping is RANCH DRESSING. To scold someone is to give them a DRESSING-DOWN. An initial sum paid for a large purchase is a DOWN PAYMENT. You can finance a purchase with a PAYMENT PLAN. A contingency strategy is your PLAN B. A low-budget film is a B-MOVIE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HOT", "PINK", "FLOYD", "MAYWEATHER", "FIGHT", "NIGHT", "VISION", "QUEST", "BAR"],
        narrative: "A bright, vivid color is HOT PINK. A legendary rock band is PINK FLOYD. A famous undefeated boxer is FLOYD MAYWEATHER. You watch a MAYWEATHER FIGHT on pay-per-view. A popular boxing video game series is FIGHT NIGHT. The ability to see in the dark is NIGHT VISION. A rite of passage in some cultures is a VISION QUEST. A popular brand of protein bar is a QUEST BAR.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["NUT", "TREE", "HUGS", "KISSES", "ASS", "MULE", "FARM", "ANIMAL", "STYLE"],
        narrative: "A NUT grows on a TREE. An environmentalist who gives TREE HUGS is a common stereotype. A classic affectionate closing is HUGS AND KISSES. A defiant retort is 'kiss my ASS'. An ASS is another name for a donkey, a relative of the MULE. A MULE is a type of FARM animal, leading to the common term FARM ANIMAL. A secret menu option at In-N-Out Burger is ANIMAL STYLE.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["VOLVO", "SAFE", "WORD", "SALAD", "DRESSING", "WOUND", "PRIDE", "FLAG", "FOOTBALL"],
        narrative: "The car brand VOLVO is globally famous for being SAFE. A SAFE WORD is a pre-arranged signal to stop an activity. A confused jumble of words is a WORD SALAD. You pour SALAD DRESSING on a salad. A sterile covering for an injury is a WOUND DRESSING (or dressing a wound). A blow to one's ego results in wounded PRIDE. The LGBTQ+ community is represented by the PRIDE FLAG. A non-contact version of American football is FLAG FOOTBALL.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CLINTON", "EMAILS", "DELETED", "MEMORY", "FOAM", "PARTY", "LINE", "DANCING", "ELF"],
        narrative: "Hillary CLINTON was at the center of a major political controversy regarding her EMAILS. Many of these emails were DELETED. A deleted MEMORY is the deletion of digital data like files or photos. A popular material for mattresses is memory FOAM. A social event at a nightclub might be a foam PARTY. A political party has a party LINE on issues. A choreographed group dance is line DANCING. A once-viral holiday e-card features a DANCING ELF.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["LASER", "TAG", "CLOUD", "BURST", "PIPE", "LINE", "COOK", "BOOK", "WORM"],
        narrative: "A fast-paced game you play in an arena is LASER TAG. A TAG CLOUD is a visual of keywords sized by frequency. When a storm builds quickly, you can get a CLOUD BURST. A sudden BURST PIPE can flood a basement. A long underground conduit for water or oil is a PIPE LINE. In a restaurant kitchen, a LINE COOK handles the rush. A COOK BOOK holds recipes instead of secrets. Someone who would rather read than socialize is often called a BOOK WORM.",
        difficulty: 'HARD'
    },
    {
        solution: ["MERMAID", "LAGOON", "POOL", "NOODLE", "SOUP", "BOWL", "GAME", "SCENE", "STEALER"],
        narrative: "In fantasy stories, a MERMAID LAGOON is a hidden cove full of mythical swimmers. A resort might advertise a LAGOON POOL with faux rocks and waterfalls. Kids love floating on a POOL NOODLE. A comforting lunch is a simple NOODLE SOUP. You serve that in a SOUP BOWL. A championship football matchup is a BOWL GAME. A scene within a video game is known as a GAME SCENE. An actor who dominates every moment is a SCENE STEALER.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PARKING", "METER", "MAID", "SERVICE", "ENTRANCE", "MUSIC", "VIDEO", "STORE", "CLERK"],
        narrative: "You pay for street spots at a PARKING METER. In old slang, the person ticketing cars was a METER MAID. Hotels often offer MAID SERVICE to clean your room. Delivery trucks sneak in through a SERVICE ENTRANCE. Wrestlers obsess over their ENTRANCE MUSIC. A short song clip with visuals is a MUSIC VIDEO. Before streaming, you rented tapes at a VIDEO STORE. The person behind the counter was the STORE CLERK.",
        difficulty: 'EASY'
    },
    {
        solution: ["VINTAGE", "VINYL", "RECORD", "SCRATCH", "PAPER", "AIRPLANE", "MODE", "SWITCH", "HITTER"],
        narrative: "A collector might hunt for rare VINTAGE VINYL at flea markets. You drop the needle on a VINYL RECORD. The classic sound effect for stopping a party is a RECORD SCRATCH. Students do math on SCRATCH PAPER. Kids fold that PAPER AIRPLANE and aim for the teacher’s hair. On your phone, AIRPLANE MODE turns off signals. A settings toggle is a MODE SWITCH. In baseball, a SWITCH HITTER can bat from either side of the plate.",
        difficulty: 'EASY'
    },
    {
        solution: ["MIDNIGHT", "SNACK", "ATTACK", "MODE", "SHIFT", "WORK", "AROUND", "TOWN", "CRIER"],
        narrative: "Raiding the fridge for a MIDNIGHT SNACK is practically a personality type. A sudden craving is a SNACK ATTACK. When you’re locked in, you’re in ATTACK MODE. Transit planners talk about a MODE SHIFT when people change how they commute. Rotating schedules can mean SHIFT WORK. A clever workaround lets you WORK AROUND a problem. Gossip about new restaurants spreads AROUND TOWN. In older cities, the TOWN CRIER was the one shouting the news in the square.",
        difficulty: 'HARD'
    },
    {
        solution: ["LILY", "ALLEN", "WRENCH", "MONKEY", "SUIT", "YOURSELF", "AWARE", "CITIZEN", "KANE"],
        narrative: "LILY ALLEN brings sharp pop energy. Every mechanic keeps an ALLEN WRENCH somewhere under a toolbox. A WRENCH MONKEY is the grease-stained hero fixing engines. A MONKEY SUIT is the outfit for pretending to be professional. “SUIT YOURSELF” is the idiom meaning do what you want. Practicing YOURSELF AWARE moments keeps you grounded. An AWARE CITIZEN notices the small things. And CITIZEN KANE is the classic everyone swears they’ve seen.",
        difficulty: "HARD"
    },
    {
        solution: ["STRANGER", "DANGER", "SIGNAL", "STRENGTH", "COACH", "DRIVER", "AIRBAG", "RECALL", "NOTICE"],
        narrative: "Parents teach kids the STRANGER DANGER rhyme early. A flashing DANGER SIGNAL gets attention fast. Tech people obsess over SIGNAL STRENGTH. A STRENGTH COACH builds athletes. A COACH DRIVER gets the whole team to the arena. A faulty DRIVER side AIRBAG could trigger an AIRBAG RECALL. And a RECALL NOTICE in the mailbox always ruins your morning.",
        difficulty: "EASY"
    },
    {
        solution: ["HEAD", "WAITER", "SERVICE", "DESK", "JOCKEY", "AROUND", "HERE", "AFTER", "HOURS"],
        narrative: "A HEAD WAITER controls the dining room with quiet authority. Good WAITER SERVICE can rescue any meal. Guests flock to the SERVICE DESK for solutions. A DESK JOCKEY lives behind a keyboard all day. “Are you from AROUND HERE?” is the classic small-talk opener. HERE AFTER sounds dramatic even when it isn’t. And AFTER HOURS is when the truly questionable decisions begin.",
        difficulty: "IMPOSSIBLE"
    },
    {
        solution: ["CONCEPTUAL", "ART", "HAUS", "FRAU", "SCHUMANN", "SONATA", "FORM", "ANALYSIS", "REPORT"],
        narrative: "Students debate CONCEPTUAL ART with intense confidence. The ART HAUS crowd claims everything has meaning. A HAUS FRAU is the German term for a housewife. Frau Clara SCHUMANN was a renowned pianist. A SCHUMANN SONATA follows classical tradition. SONATA FORM is the blueprint behind it. A FORM ANALYSIS breaks each part down. And an ANALYSIS REPORT is the thing you finalize at 3 a.m.",
        difficulty: "HARD"
    },
    {
        solution: ["ACT", "THREE", "PEAT", "SWAMP", "GAS", "PUMP", "FAKE", "FUR", "ELISE"],
        narrative: "A great ACT THREE twist can save a shaky story. A THREE PEAT shows pure dominance. A PEAT SWAMP forms slowly over centuries. Strange lights once got blamed on SWAMP GAS. A GAS PUMP always breaks when you’re already late. A clever FAKE PUMP move fools any defender. Runway models love bold FAKE FUR. And FUR ELISE is the piece everyone starts learning and never finishes.",
        difficulty: "EASY"
    },
    {
        solution: ["CHAOS", "MAGIC", "POTION", "RECIPE", "BLOG", "POST", "MODERN", "ART", "GARFUNKEL"],
        narrative: "Performers love CHAOS MAGIC for the flair. A MAGIC POTION always needs one rare ingredient. A POTION RECIPE is half fantasy. Every RECIPE BLOG begins with a life story. A dramatic BLOG POST can explode a comment section. POST MODERN labels everything confusing. MODERN ART keeps critics nodding. And ART GARFUNKEL lives forever in crosswords.",
        difficulty: "EASY"
    },
    {
        solution: ["THICK", "SKIN", "CARE", "BEAR", "FRUIT", "LEATHER", "JACKET", "SLEEVE", "TATTOO"],
        narrative: "A THICK SKIN keeps you steady. A solid SKIN CARE routine promises miracles. A CARE BEAR is the lovable furry toy every kid owned. Some plants BEAR FRUIT only when they choose. Homemade FRUIT LEATHER is nostalgia wrapped in parchment. A LEATHER JACKET instantly boosts cool. A JACKET SLEEVE hides half your life. And a SLEEVE TATTOO turns your arm into a personal story.",
        difficulty: "EASY"
    },
    {
        solution: ["PRIMAL", "FEAR", "WATER", "LIQUID", "DEATH", "METAL", "MOUTH", "TAPE", "CASSETTE"],
        narrative: "PRIMAL FEAR hits before logic kicks in. The FEAR of WATER is a very real phobia. WATER can be in a LIQUID state. LIQUID DEATH is a notorious canned water brand. DEATH METAL fans like it loud and ferocious. Kids with braces once got called METAL MOUTH. MOUTH TAPE is used by kidnappers and wellness enthusiasts alike for very different reasons. And TAPE CASSETTE nostalgia is stronger than its audio quality ever was.",
        difficulty: "HARD"
    },
    { 
        solution: ["FIRE", "HOUSE", "CAT", "NAP", "TIME", "TABLE", "CLOTH", "PIN", "CUSHION"], 
        narrative: "A FIREHOUSE is a fire station. A cat that lives in a house is a HOUSE CAT. A short sleep is a CAT NAP. You can have a NAP TIME. A schedule is a TIMETABLE. A cloth for a table is a TABLECLOTH. A pin for clothes is a CLOTHES PIN. A soft pad for pins is a PINCUSHION.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["LIVING", "ROOM", "LIGHT", "SWITCH", "BLADE", "RUNNER", "UP", "STAIRS", "CASE"], 
        narrative: "A main area in a house is the LIVING ROOM. A ROOM has a ROOM LIGHT. You turn it on with a LIGHT SWITCH. A knife is a SWITCHBLADE. A famous movie is BLADE RUNNER. A person who finishes second is a RUNNER-UP. To go to the next floor is to go UPSTAIRS. A set of stairs is a STAIRCASE.",
        difficulty: 'EASY' 
    },
    { 
        solution: ["BRAIN", "TRUST", "FUND", "MANAGER", "SPECIAL", "THANKS", "GIVING", "TREE", "HUGGER"], 
        narrative: "A group of expert advisors is a BRAIN TRUST. A type of investment is a TRUST FUND. A person who manages money is a FUND MANAGER. A discount is a MANAGER'S SPECIAL. You give SPECIAL THANKS. A holiday is THANKSGIVING. A famous children's book is 'The GIVING TREE'. An environmentalist is a TREE HUGGER.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["EMPTY", "NEST", "EGG", "HEAD", "HUNTER", "GREEN", "BELT", "LOOP", "HOLE"], 
        narrative: "Parents of adult children have an EMPTY NEST. A bird's NEST holds an EGG. An intellectual is an EGGHEAD. A recruiter is a HEADHUNTER. A specific color is HUNTER GREEN. A protected area of land is a GREENBELT. A BELT creates a LOOP. A legal exemption is a LOOPHOLE.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["LIFE", "LONG", "SHOT", "PUT", "UP", "SET", "POINT", "TAKEN", "CARE"], 
        narrative: "Something that lasts a lifetime is LIFELONG. A difficult attempt is a LONG SHOT. A track and field event is the SHOT PUT. To 'put up or shut up' is a phrase, or to PUT UP a fight. To be defeated is to be UPSET. In tennis, you can have a SET POINT. To be 'POINT TAKEN' means a point is accepted. 'TAKEN CARE of' means handled.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["FOOT", "PRINT", "SHOP", "TALK", "BACK", "BONE", "DRY", "WALL", "ART"], 
        narrative: "You leave a FOOTPRINT in the sand. A place that makes copies is a PRINT SHOP. To discuss work is to SHOP TALK. To reply rudely is to TALK BACK. A spine is a BACKBONE. To be very dry is to be BONE-DRY. A type of building material is DRYWALL. A painting for your home is WALL ART.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["SUN", "DAY", "CARE", "PACKAGE", "STORE", "FRONT", "RUNNER", "BEAN", "BAG"], 
        narrative: "The weekend includes SUNDAY. A place for children is DAYCARE. You can send a CARE PACKAGE. A place to buy alcohol is a PACKAGE STORE. The outside of a shop is its STOREFRONT. A person in the lead is a FRONT-RUNNER. A type of vegetable is a RUNNER BEAN. A type of chair is a BEANBAG.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["SEA", "FOOD", "COURT", "SIDE", "STEP", "LADDER", "BACK", "FIRE", "FLY"], 
        narrative: "You can eat SEAFOOD from the ocean. A mall has a FOOD COURT. You can sit COURTSIDE at a game. To avoid something is to SIDESTEP it. A portable set of stairs is a STEPLADDER. A type of chair is a LADDER-BACK. A plan can BACKFIRE. A lightning bug is a FIREFLY.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["SILVER", "FISH", "WIFE", "BEATER", "CAR", "BOMB", "PROOF", "READ", "ONLY"], 
        narrative: "A common household pest is a SILVERFISH. An old-fashioned, coarse woman is a FISHWIFE. A slang term for an undershirt is a WIFEBEATER. A dilapidated car is a BEATER CAR. An explosive device is a CAR BOMB. To be indestructible is to be BOMBPROOF. To check for errors is to PROOFREAD. A file can be READ-ONLY.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["BODY", "COUNT", "DOWN", "MARKET", "MAKER", "FAIRE", "GAME", "BOY", "BAND"], 
        narrative: "A slang term is a BODYCOUNT. A timer has a COUNTDOWN. A bad economy is a DOWN MARKET. A finance term is a MARKET MAKER. A craft event is a MAKER FAIRE. An old-timey spelling is FAIRE GAME. A classic Nintendo is a GAMEBOY. A musical group is a BOYBAND.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["SPACE", "CADET", "BLUE", "PRINT", "HEAD", "SET", "LIST", "SERVER", "FARM"], 
        narrative: "A ditsy person is a SPACE CADET. A specific pale color is CADET BLUE. A plan is a BLUEPRINT. A part of an inkjet printer is a PRINTHEAD. You wear a HEADSET for calls. A band prepares a SETLIST. An old email subscription service is a LISTSERVER. A place with computers is a SERVER FARM.", 
        difficulty: 'IMPOSSIBLE' 
    },
    { 
        solution: ["GHOST", "LIGHT", "SABER", "TOOTH", "FAIRY", "CIRCLE", "JERK", "STORE", "BRAND"], 
        narrative: "A theater superstition is the GHOSTLIGHT. A 'Star Wars' weapon is a LIGHTSABER. A prehistoric tiger is a SABERTOOTH. A mythical creature is the TOOTH FAIRY. A natural fungal phenomenon is a FAIRY CIRCLE. A slang term for a self-congratulatory group is a CIRCLEJERK. A famous 'Seinfeld' insult is the JERK STORE. A generic product is a STORE BRAND.", 
        difficulty: 'IMPOSSIBLE' 
    },
    { 
        solution: ["SAINT", "NICK", "NAME", "TAG", "TEAM", "WORK", "OUT", "LAST", "CALL"], 
        narrative: "A Christmas figure is SAINT NICK. A short, familiar name is a NICKNAME. You wear a NAME TAG at a conference. A pair of wrestlers is a TAG TEAM. Collaboration is TEAMWORK. To exercise is to WORKOUT. To endure is to OUTLAST. The final chance to order drinks is the LAST CALL.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["FREE", "AGENT", "PROVOCATEUR", "SPEECH", "BUBBLE", "BATH", "TUB", "TIME", "STAMP"], 
        narrative: "An athlete without a contract is a FREE AGENT. A person who incites trouble is an AGENT PROVOCATEUR. A formal address is a PROVOCATEUR SPEECH. A comic book thought is a SPEECH BUBBLE. You take a relaxing BUBBLE BATH. A bath is in a TUB. A soak in the tub is TUB TIME. A digital record of when something happened is a TIMESTAMP.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["SPEED", "BOAT", "HOOK", "UP", "BEAT", "DOWN", "STREAM", "LINE", "EDIT"], 
        narrative: "A fast watercraft is a SPEEDBOAT. A BOATHook is used to grab a dock line. A casual romantic encounter is a HOOKUP. An energetic song has an UPBEAT. To assault someone is to BEAT them DOWN. To watch media online is to DOWNSTREAM. To make something efficient is to STREAMLINE. A final check of text is a LINE EDIT.", 
        difficulty: 'EASY' 
    },
    { 
        solution: ["POWER", "POINT", "BLANK", "CHECK", "MATE", "BOX", "SCORE", "KEEPERS", "TALE"], 
        narrative: "A presentation slide is a POWERPOINT. At close range is POINT-BLANK. To have unlimited funds is to have a BLANK CHECK. The end of a chess game is CHECKMATE. A MATEBOX is a type of chess puzzle. A newspaper summary of a game is a BOX SCORE. The people tracking points are the SCOREKEEPERS. A story passed down by guardians is a KEEPERS' TALE.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["STRONG", "ARM", "BAND", "LEADER", "WRITER", "PROMPT", "PAY", "CHECK", "POINT"], 
        narrative: "To use force is to STRONG-ARM someone. A group has an ARMBAND. A band has a BANDLEADER. A main author is a LEADER-WRITER. A creative suggestion is a WRITER'S PROMPT. To pay immediately is PROMPT PAY. An employee's salary is a PAYCHECK. A military post is a CHECKPOINT.",
        difficulty: 'HARD' 
    },
    { 
        solution: ["SUGAR", "COAT", "HANGER", "RASH", "GUARD", "DOG", "PADDLE", "WHEEL", "HOUSE"], 
        narrative: "To make something sound better is to SUGARCOAT it. You hang clothes on a COAT HANGER. An irritation from clothing is a HANGER RASH. A skin protectant is a RASH GUARD. A dog that protects property is a GUARD DOG. A way to swim is the DOG PADDLE. A boat can be a PADDLEWHEEL. The cover for the wheel is the WHEELHOUSE.", 
        difficulty: 'HARD' 
    },
    { 
        solution: ["FUNNY", "BONE", "YARD", "BIRD", "BRAIN", "CHILD", "PROOF", "POINT", "BREAK"], 
        narrative: "The nerve in your elbow is your FUNNY BONE. A cemetery or junkyard is a Boneyard. Charlie Parker's nickname was YARDBIRD. A stupid person is a BIRDBRAIN. An original idea is someone's BRAINCHILD. To make a home safe for a baby is to CHILDPROOF it. A piece of evidence is a PROOF POINT. A classic surf/heist movie is POINT BREAK.", 
        difficulty: 'IMPOSSIBLE' 
    },
    { 
        solution: ["FALSE", "FLAG", "SHIP", "WRECK", "ROOM", "TONE", "POEM", "BOOK", "SMART"], 
        narrative: "A deceptive military operation is a FALSE FLAG. A nation's naval vessel is a FLAGSHIP. A sunken vessel is a SHIPWRECK. A messy place is a WRECK-ROOM. The ambient sound of a location is ROOM TONE. A collection of poetry is a TONE POEM. A volume of verse is a POEM BOOK. To have academic intelligence is to be BOOKSMART.", 
        difficulty: 'IMPOSSIBLE' 
    },
    {
        solution: ["SNOW", "FLAKE", "OFF", "KEY", "RING", "FINGER", "PAINT", "BRUSH", "FIRE"],
        narrative: "A SNOWFLAKE is a unique ice crystal. To FLAKE OFF means to cancel plans. Something OFF-KEY is out of tune. A KEYRING holds your keys. A RING FINGER is where you wear a wedding ring. FINGERPAINT is a type of art. A PAINTBRUSH is used for painting. A BRUSHFIRE spreads quickly through dry vegetation.",
        difficulty: 'EASY'
    },
    {
        solution: ["BREAD", "CRUMB", "TRAIL", "BLAZER", "BUTTON", "HOLE", "CARD", "SHARK", "TANK"],
        narrative: "A BREADCRUMB is a small piece of bread. A CRUMB TRAIL helps you find your way back. A TRAIL BLAZER is a pioneer who opens new paths. A BLAZER BUTTON fastens a jacket. A BUTTONHOLE is an opening for a button. A HOLE CARD is hidden in poker. A CARD SHARK is a skilled card player. SHARK TANK is a popular TV show about entrepreneurs.",
        difficulty: 'HARD'
    },
    {
        solution: ["DEAD", "BEAT", "GENERATION", "X", "RAY", "BAN", "HAMMER", "TIME", "LAPSE"],
        narrative: "A DEADBEAT is someone who avoids responsibilities. The BEAT GENERATION was a literary movement. GENERATION X is a demographic cohort. An X-RAY shows bones. RAY-BAN is a brand of sunglasses. A BAN HAMMER is internet slang for a moderator's power to ban users. HAMMER TIME is a reference to the MC Hammer song. A TIME LAPSE is a photography technique.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["APPLE", "SEED", "MONEY", "TREE", "HOUSE", "PLANT", "FOOD", "CHAIN", "LINK"],
        narrative: "An APPLE SEED grows into a tree. SEED MONEY is initial capital for a business. A MONEY TREE is a lucky plant. A TREE HOUSE is a play structure. A HOUSE PLANT grows indoors. PLANT FOOD is fertilizer. A FOOD CHAIN shows what eats what. A CHAIN LINK is a type of fence.",
        difficulty: 'EASY'
    },
    {
        solution: ["RAIN", "BOW", "STRING", "CHEESE", "BURGER", "KING", "SIZE", "UP", "SCALE"],
        narrative: "A RAINBOW appears after rain. A BOW STRING is part of an archery bow. STRING CHEESE is a snack. A CHEESEBURGER has cheese. BURGER KING is a fast-food chain. KING SIZE means extra large. To SIZE UP means to evaluate. UPSCALE means fancy or high-end.",
        difficulty: 'HARD'
    },
    {
        solution: ["CELESTIAL", "ARCHANGEL", "MICHAEL", "JACKSON", "FIVE", "STAR", "TREK", "BICYCLE", "SHOP"],
        narrative: "A CELESTIAL ARCHANGEL is a heavenly angel of high rank. ARCHANGEL MICHAEL is a prominent figure in religious texts. MICHAEL JACKSON was a famous pop star. The JACKSON FIVE was a popular music group. A FIVE STAR rating means excellent quality. STAR TREK is a famous science fiction franchise. TREK BICYCLE is a well-known bicycle brand. A BICYCLE SHOP sells bikes and accessories.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MIDNIGHT", "COWBOY", "BEBOP", "JAZZ", "HANDS", "FREE", "WILL", "POWER", "RANGER"],
        narrative: "MIDNIGHT COWBOY is a classic 1969 film. COWBOY BEBOP is a popular Japanese anime series. BEBOP is a style of jazz music. JAZZ HANDS is a theatrical dance move. HANDS FREE means without using hands. FREE WILL is a philosophical concept about choice. WILL POWER is mental strength and determination. POWER RANGER is a character from the Mighty Morphin Power Rangers TV show.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PENGUIN", "TUXEDO", "WEDDING", "DISASTER", "VOLCANO", "LAVA", "FONDUE", "SKEWER", "VAMPIRE"],
        narrative: "A PENGUIN looks like it's wearing a TUXEDO. A TUXEDO is formal wear for a WEDDING. A WEDDING can turn into a DISASTER. A VOLCANO can cause a DISASTER. A VOLCANO erupts LAVA. LAVA flows like melted FONDUE. FONDUE is eaten with a SKEWER. A SKEWER can be used to stake a VAMPIRE.",
        difficulty: 'EASY'
    },
    {
        solution: ["BANANA", "MONKEY", "JUNGLE", "TARZAN", "LOINCLOTH", "WEDGIE", "EMBARRASSED", "BLUSH", "TOMATO"],
        narrative: "BANANA is a favorite food of a MONKEY. A MONKEY lives in the JUNGLE. TARZAN is famous for living in the JUNGLE. TARZAN wears a LOINCLOTH. A poorly fitted LOINCLOTH could give you a WEDGIE. Getting a WEDGIE makes you EMBARRASSED. When you're EMBARRASSED, you BLUSH. When you BLUSH, you turn red like a TOMATO.",
        difficulty: 'HARD'
    },
    {
        solution: ["BURRITO", "BABY", "SHOWER", "KARAOKE", "TORTURE", "MEDIEVAL", "TIMES", "SQUARE", "PANTS"],
        narrative: "A baby wrapped snugly is a BURRITO BABY. A celebration for an expectant parent is a BABY SHOWER. People sing karaoke in the SHOWER. Listening to bad karaoke can feel like TORTURE. MEDIEVAL TORTURE devices were used in the Middle Ages. MEDIEVAL TIMES is a dinner theater restaurant with knights and jousting. TIMES SQUARE is a famous landmark in New York City. SQUARE PANTS are what SpongeBob SquarePants wears.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SPRINKLES", "RAINBOW", "UNICORN", "HORN", "ALARM", "BURGLAR", "GLOVE", "PRINTS", "INTERROGATION"],
        narrative: "SPRINKLES look like a chopped-up RAINBOW. A RAINBOW UNICORN is a colorful myth. A unicorn has a distinctive HORN. A loud HORN can act as an ALARM to protect you from a BURGLAR who may be wearing a GLOVE on each hand to hide his or her finger PRINTS, because finding prints at a crime scene can lead to an INTERROGATION.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GOLDEN", "GATE", "CRASH", "TEST", "DUMMY", "PROOF", "READING", "ROOM", "TEMP"],
        narrative: "The GOLDEN GATE is a famous bridge in San Francisco. To GATE CRASH is to enter without invitation. A CRASH TEST evaluates vehicle safety. A TEST DUMMY is used in crash tests. DUMMY PROOF means foolproof. PROOF READING checks for errors. A READING ROOM is a quiet space in a library. ROOM TEMP is short for room temperature.",
        difficulty: 'EASY'
    },
    {
        solution: ["HONEY", "TRAP", "DOOR", "BELL", "HOP", "SCOTCH", "TAPE", "WORM", "WOOD"],
        narrative: "A HONEY TRAP is an espionage tactic using seduction. A TRAP DOOR is a hidden floor panel. A DOORBELL announces visitors. A BELLHOP carries luggage at hotels. HOPSCOTCH is a children's game. SCOTCH TAPE is an adhesive. A TAPEWORM is a parasitic worm. WORMWOOD is a bitter herb used in absinthe.",
        difficulty: 'HARD'
    },
    {
        solution: ["DOOM", "SCROLL", "SAW", "BUCK", "NAKED", "EYE", "CANDY", "MAN", "CAVE"],
        narrative: "To DOOM SCROLL is to endlessly browse negative news. A SCROLL SAW is a tool for intricate cuts. A SAWBUCK is old slang for a $10 bill. BUCK NAKED means completely nude. The NAKED EYE sees without optical aid. EYE CANDY is something visually appealing. The CANDY MAN is a horror villain or slang for a drug dealer. A MAN CAVE is a personal retreat space.",
        difficulty: 'HARD'
    },
    {
        solution: ["SLAY", "QUEEN", "SIZE", "ZERO", "DARK", "THIRTY", "ROCK", "LOBSTER", "TAIL"],
        narrative: "SLAY QUEEN is internet slang for empowerment. A QUEEN SIZE bed is larger than full. SIZE ZERO is the smallest clothing size. ZERO DARK is military time for early morning. DARK THIRTY refers to pre-dawn hours, from the film Zero Dark Thirty. 30 ROCK is the Tina Fey TV comedy. ROCK LOBSTER is a classic B-52's song. A LOBSTER TAIL is a seafood delicacy.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["LAMP", "POST", "CARD", "BOARD", "WALK", "ABOUT", "TURN", "OVER", "COAT"],
        narrative: "A LAMP POST is a street light. A POST CARD is a mailable souvenir. CARDBOARD is stiff paper material. A BOARDWALK is a wooden promenade. A WALKABOUT is an informal stroll. An ABOUT TURN is a reversal of direction. A TURNOVER is a pastry or a business metric. An OVERCOAT is a warm outer garment.",
        difficulty: 'EASY'
    },
    {
        solution: ["CORN", "BREAD", "WINNER", "TAKE", "ALL", "NIGHT", "STAND", "STILL", "LIFE"],
        narrative: "CORNBREAD is a food. A BREADWINNER supports a family. WINNER-TAKE-ALL is a competition style. An ALL-NIGHT event lasts until morning. A NIGHTSTAND is bedside furniture. To STAND STILL is to not move. A STILL LIFE is a type of painting.",
        difficulty: 'EASY'
    },
    {
        solution: ["SPACE", "CAMP", "GROUND", "FLOOR", "MODEL", "T", "SHIRT", "FRONT", "DESK"],
        narrative: "SPACE CAMP is for aspiring astronauts. A CAMPGROUND is for camping. The GROUND FLOOR is street level. A FLOOR MODEL is a display item. The MODEL T was an early Ford car. A T-SHIRT is a casual top. A SHIRT FRONT is the front part of a shirt. The FRONT DESK is a reception area.",
        difficulty: 'HARD'
    },
    {
        solution: ["COLD", "CASE", "LOAD", "STAR", "GAZING", "BALL", "HOG", "WILD", "SIDE"],
        narrative: "A COLD CASE is an unsolved crime. A CASE LOAD is the number of cases handled. A LOADSTAR is a guiding star (lodestar). STARGAZING is looking at the night sky. A GAZING BALL is a garden ornament. To BALL HOG is to keep the ball to oneself. HOG WILD means out of control. The WILD SIDE is an adventurous lifestyle.",
        difficulty: 'HARD'
    },
    {
        solution: ["THUG", "LIFE", "HACK", "JOB", "HUNT", "DOWN", "BAD", "BLOOD", "ORANGE"],
        narrative: "THUG LIFE is a hip hop culture term. A LIFE HACK is a clever trick. A HACK JOB is poorly done work. A JOB HUNT is searching for employment. To HUNT DOWN is to pursue relentlessly. DOWN BAD is slang for being depressed or desperate. BAD BLOOD means animosity. A BLOOD ORANGE is a citrus fruit.",
        difficulty: 'HARD'
    },
    {
        solution: ["PRIMA", "FACIE", "VALUE", "JUDGMENT", "CALL", "FORWARD", "MARCH", "HARE", "BRAINED"],
        narrative: "PRIMA FACIE is Latin for 'at first sight' or 'on the face of it'. FACIE is Latin for FACE, connecting to FACE VALUE, which is the apparent worth. A VALUE JUDGMENT is an assessment of merit. A JUDGMENT CALL is a subjective decision. CALL FORWARDING redirects phone calls. FORWARD MARCH is a command to advance. The MARCH HARE is a character in Alice in Wonderland. A HAREBRAINED idea is reckless or foolish.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["LOCK", "STEP", "BROTHER", "HOOD", "WINK", "EYE", "SHADOW", "BOX", "OFFICE"],
        narrative: "To be in LOCKSTEP is to move in unison. A STEPBROTHER is a sibling by marriage. BROTHERHOOD is a bond between brothers. To HOODWINK is to deceive. To WINK AN EYE is a gesture. EYESHADOW is makeup. SHADOWBOXING is training against an imaginary opponent. The BOX OFFICE sells tickets.",
        difficulty: 'EASY'
    },
    {
        solution: ["OCKHAM", "RAZOR", "SHARP", "SHOOTER", "MARBLE", "RYE", "WHISKEY", "SOUR", "GRAPES"],
        narrative: "OCKHAM'S RAZOR is the philosophical principle of parsimony, attributed to the 14th-century English friar and philosopher William of Ockham (also spelled Occam). RAZOR SHARP means extremely keen. A SHARPSHOOTER is an expert marksman. A SHOOTER MARBLE is used to strike other marbles in the game. MARBLE RYE is a swirled bread (famously featured in Seinfeld). RYE WHISKEY is a spirit made from rye grain. A WHISKEY SOUR is a classic cocktail. SOUR GRAPES is an idiom from Aesop's fable about bitter jealousy.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FREUDIAN", "SLIP", "COVER", "BAND", "WAGON", "TRAIN", "WRECK", "BALL", "ROOM"],
        narrative: "A FREUDIAN SLIP is an error revealing subconscious thoughts. A SLIPCOVER protects furniture. A COVER BAND plays songs by other artists. To jump on the BANDWAGON is to follow a popular trend. A WAGON TRAIN was a caravan of pioneers heading West. A TRAIN WRECK is a disaster (literal or figurative). A WRECKING BALL demolishes buildings. A BALLROOM is a grand space for dancing.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SCHRODINGER", "CAT", "WALK", "OVER", "THROW", "BACK", "CHANNEL", "ISLANDS", "HOP"],
        narrative: "SCHRÖDINGER'S CAT is a famous quantum mechanics thought experiment. A CATWALK is a fashion runway. A WALKOVER is an easy victory. To OVERTHROW is to depose a ruler. A THROWBACK is a return to the past. A BACK CHANNEL is an unofficial communication route. The CHANNEL ISLANDS are located between England and France. ISLAND HOPPING is traveling between islands.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TURING", "TEST", "TUBE", "TOP", "HEAVY", "METAL", "HEAD", "BANGER", "SISTERS"],
        narrative: "The TURING TEST evaluates machine intelligence. A TEST TUBE is laboratory glassware. A TUBE TOP is a strapless garment. TOP-HEAVY means unbalanced with weight at the top. HEAVY METAL is a music genre. A METALHEAD is a heavy metal enthusiast. A HEADBANGER is someone who headbangs to music. THE BANGER SISTERS is a 2002 film starring Goldie Hawn and Susan Sarandon.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SINE", "QUA", "NON", "STARTER", "PISTOL", "GRIP", "STRENGTH", "TRAINING", "WHEELS"],
        narrative: "SINE QUA NON is Latin for 'without which not' — an essential condition. A NON-STARTER is something that won't succeed. A STARTER PISTOL begins races. A PISTOL GRIP is a type of handle shaped like a gun grip. GRIP STRENGTH measures hand power. STRENGTH TRAINING is exercise to build muscle. TRAINING WHEELS help children learn to ride bicycles.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PYRRHIC", "VICTORY", "GARDEN", "VARIETY", "HOUR", "HAND", "WRITTEN", "WORD", "SMITH"],
        narrative: "A PYRRHIC VICTORY is a win at too great a cost, named after King Pyrrhus of Epirus who defeated the Romans but suffered devastating losses. A VICTORY GARDEN was a home vegetable plot encouraged during WWII. GARDEN VARIETY means ordinary or common. A VARIETY HOUR was a TV entertainment format. The HOUR HAND indicates time on a clock. HANDWRITTEN means composed by hand. The WRITTEN WORD refers to literature and text. A WORDSMITH is a skilled writer or linguist.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PLANCK", "CONSTANT", "COMPANION", "PIECE", "MEAL", "PREP", "SCHOOL", "MASTER", "MIND"],
        narrative: "The PLANCK CONSTANT (h) is a fundamental constant in quantum mechanics, discovered by Max Planck. A CONSTANT COMPANION is an ever-present friend. A COMPANION PIECE is a related work of art or literature. PIECEMEAL means doing something gradually, bit by bit. MEAL PREP is the practice of preparing food in advance. PREP SCHOOL is a private preparatory school. A SCHOOLMASTER is a teacher (archaic). A MASTERMIND is a brilliant planner or criminal genius.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CARTESIAN", "PLANE", "CRASH", "COURSE", "WORK", "FLOW", "CHART", "BUSTER", "KEATON"],
        narrative: "The CARTESIAN PLANE is a coordinate system named after philosopher René Descartes. A PLANE CRASH is an aviation disaster. A CRASH COURSE is intensive, accelerated learning. COURSEWORK refers to academic assignments. WORKFLOW is a sequence of processes. A FLOW CHART diagrams a process visually. A CHARTBUSTER is a hit song that tops the charts. BUSTER KEATON was a legendary silent film comedian known for his physical stunts and deadpan expression.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["QUIXOTIC", "QUEST", "ION", "CHANNEL", "SURF", "ACE", "VENTURA", "HIGHWAY", "MAN"],
        narrative: "A QUIXOTIC QUEST is an idealistic but impractical pursuit, evoking Don Quixote's noble yet foolish adventures. A QUESTION is an inquiry (QUEST + ION). An ION CHANNEL is a protein in cell membranes that allows ions to pass through. To CHANNEL SURF is to flip through TV channels. A SURFACE is the outer boundary of something (SURF + ACE). ACE VENTURA is Jim Carrey's eccentric pet detective character. VENTURA HIGHWAY is a 1972 song by the band America. A HIGHWAYMAN was a mounted robber who held up travelers.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SISYPHEAN", "TASK", "BAR", "TENDER", "LOIN", "CLOTH", "BOUND", "LESS", "THAN"],
        narrative: "A SISYPHEAN TASK is an endless, futile labor, from the Greek myth of Sisyphus condemned to roll a boulder up a hill for eternity. A TASKBAR is the strip at the bottom of a computer screen. A BARTENDER serves drinks. TENDERLOIN is a premium cut of meat (also a neighborhood in San Francisco). A LOINCLOTH is a minimal garment worn around the waist. CLOTHBOUND describes books bound in fabric. BOUNDLESS means without limits or infinite. LESS THAN is a mathematical inequality symbol (<).",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PLATONIC", "SOLID", "GOLD", "DIGGER", "WASP", "STING", "OPERATION", "MANUAL", "LABOR"],
        narrative: "A PLATONIC SOLID is one of five regular polyhedra identified by Plato: tetrahedron, cube, octahedron, dodecahedron, and icosahedron. SOLID GOLD means pure gold or something excellent. A GOLD DIGGER is someone who pursues wealthy partners for money. A DIGGER WASP is a solitary wasp that burrows into the ground. A WASP STING is the painful injection of venom. A STING OPERATION is an undercover law enforcement operation. An OPERATION MANUAL provides instructions. MANUAL LABOR is physical work done by hand.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HIPPOCRATIC", "OATH", "TAKER", "OVER", "LORD", "BYRON", "BAY", "LEAF", "BLOWER"],
        narrative: "The HIPPOCRATIC OATH is the ethical pledge taken by physicians, attributed to the ancient Greek physician Hippocrates. An OATH TAKER is one who swears a solemn promise. A TAKEOVER is the acquisition of control, especially of a company. An OVERLORD is a supreme ruler or master. LORD BYRON (George Gordon Byron) was a leading Romantic poet. BYRON BAY is a famous coastal town in New South Wales, Australia. A BAY LEAF is an aromatic herb used in cooking. A LEAF BLOWER is a garden tool for clearing debris.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["JUNGIAN", "ANALYSIS", "PARALYSIS", "TICK", "BORNE", "IDENTITY", "POLITICS", "USUAL", "SUSPECT"],
        narrative: "JUNGIAN ANALYSIS is the psychoanalytic approach developed by Carl Jung, exploring archetypes and the collective unconscious. ANALYSIS PARALYSIS is the state of overthinking that prevents action. A PARALYSIS TICK is a tick whose bite can cause temporary paralysis. TICK-BORNE diseases are illnesses transmitted by tick bites. THE BOURNE IDENTITY is a novel and film about an amnesiac spy. IDENTITY POLITICS refers to political positions based on social identity. POLITICS AS USUAL describes typical political behavior. THE USUAL SUSPECTS is a 1995 neo-noir film.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["KEYNESIAN", "ECONOMICS", "CLASS", "ACTION", "FIGURE", "SKATING", "RINK", "RAT", "PACK"],
        narrative: "KEYNESIAN ECONOMICS is the macroeconomic theory developed by John Maynard Keynes, advocating government intervention during recessions. An ECONOMICS CLASS is a course studying economic principles. A CLASS ACTION is a lawsuit filed on behalf of a group. An ACTION FIGURE is a poseable toy figurine. FIGURE SKATING is an ice sport combining athleticism and artistry. A SKATING RINK is an arena for ice skating. A RINK RAT is someone who spends excessive time at skating rinks. The RAT PACK was the famous 1960s entertainment group led by Frank Sinatra.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["ORWELLIAN", "DOUBLE", "SPEAK", "EASY", "RIDER", "HAGGARD", "LOOK", "OUT", "CAST"],
        narrative: "ORWELLIAN DOUBLESPEAK refers to deliberately contradictory or misleading language, from George Orwell's dystopian novel '1984.' DOUBLESPEAK is language that obscures or distorts meaning. A SPEAKEASY was an illicit bar during Prohibition. EASY RIDER is the iconic 1969 counterculture film. H. RIDER HAGGARD was a Victorian adventure novelist who wrote 'King Solomon's Mines.' A HAGGARD LOOK is an exhausted, worn appearance. A LOOKOUT is a person keeping watch or a vantage point. An OUTCAST is someone rejected by society.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FARADAY", "CAGE", "MATCH", "MAKER", "OVER", "BITE", "SIZE", "ABLE", "SEAMAN"],
        narrative: "A FARADAY CAGE is an enclosure that blocks electromagnetic fields, named after physicist Michael Faraday. A CAGE MATCH is a wrestling bout inside an enclosed ring. A MATCHMAKER arranges marriages or partnerships. A MAKEOVER is a transformation of appearance. An OVERBITE is a dental condition where upper teeth protrude. BITE-SIZE means small enough to eat in one mouthful. SIZEABLE means fairly large or considerable. An ABLE SEAMAN is a naval rank for an experienced sailor.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SOCRATIC", "IRONY", "CURTAIN", "CALL", "SIGN", "POST", "SCRIPT", "DOCTOR", "WHO"],
        narrative: "SOCRATIC IRONY is the technique of feigning ignorance to expose others' contradictions, used by the philosopher Socrates. The IRON CURTAIN was the ideological boundary dividing Cold War Europe. A CURTAIN CALL is when performers take a bow after a show. A CALL SIGN is an identifying radio broadcast signal. A SIGNPOST is a directional marker. A POSTSCRIPT (P.S.) is an additional note after a letter's main body. A SCRIPT DOCTOR is a writer hired to improve screenplays. DOCTOR WHO is the long-running BBC science fiction series.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DARWINIAN", "FITNESS", "CENTER", "FOLD", "OUT", "PATIENT", "ZERO", "HOUR", "GLASS"],
        narrative: "DARWINIAN FITNESS refers to an organism's reproductive success in evolutionary biology, a concept from Charles Darwin. A FITNESS CENTER is a gym or health club. A CENTERFOLD is the center spread of a magazine. A FOLDOUT is a page that unfolds to reveal more content. An OUTPATIENT receives medical treatment without being admitted to a hospital. PATIENT ZERO is the first identified case in an epidemic. ZERO HOUR is the critical moment when something begins. An HOURGLASS is a device that measures time with flowing sand.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["KAFKAESQUE", "NIGHTMARE", "FUEL", "EFFICIENT", "MARKET", "SQUARE", "ROOT", "CANAL", "BOAT"],
        narrative: "KAFKAESQUE describes surreal, oppressive situations reminiscent of Franz Kafka's nightmarish fiction. NIGHTMARE FUEL is slang for something terrifying. FUEL EFFICIENT describes vehicles that use less gasoline. The EFFICIENT MARKET hypothesis is an economics theory. A MARKET SQUARE is a public plaza for commerce. A SQUARE ROOT is a mathematical operation. A ROOT CANAL is a dental procedure to treat infected pulp. A CANAL BOAT is a narrow vessel designed for waterways.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["COPERNICAN", "REVOLUTION", "COUNTER", "ATTACK", "DOG", "POUND", "CAKE", "STAND", "ALONE"],
        narrative: "The COPERNICAN REVOLUTION was the paradigm shift from geocentric to heliocentric astronomy, initiated by Nicolaus Copernicus. A REVOLUTION COUNTER (tachometer) measures rotational speed. A COUNTERATTACK is a retaliatory military strike. An ATTACK DOG is trained for aggressive protection. A DOG POUND is an animal shelter. POUND CAKE is a dense, buttery cake traditionally made with a pound each of butter, sugar, eggs, and flour. A CAKE STAND displays baked goods. STAND-ALONE means independent or self-contained.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["EUCLIDEAN", "ALGORITHM", "DESIGN", "FLAW", "LESS", "FILLING", "STATION", "WAGON", "WHEEL"],
        narrative: "The EUCLIDEAN ALGORITHM is an ancient method for finding the greatest common divisor, developed by the Greek mathematician Euclid. ALGORITHM DESIGN is the process of creating computational procedures. A DESIGN FLAW is a defect in planning. FLAWLESS means perfect, without defects. LESS FILLING was the famous Miller Lite advertising slogan. A FILLING STATION is an old term for a gas station. A STATION WAGON is a type of car with extended cargo space. A WAGON WHEEL is the circular wheel on a wagon.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HEGELIAN", "DIALECTIC", "TENSION", "HEADACHE", "RELIEF", "PITCHER", "PLANT", "BASED", "KING"],
        narrative: "The HEGELIAN DIALECTIC is the philosophical method of thesis-antithesis-synthesis developed by Georg Wilhelm Friedrich Hegel. DIALECTICAL TENSION is the opposition between contradictory ideas. A TENSION HEADACHE is stress-induced head pain. HEADACHE RELIEF is pain remedy. A RELIEF PITCHER in baseball substitutes for the starting pitcher. A PITCHER PLANT is a carnivorous plant that traps insects. PLANT-BASED means derived from plants. BASED KING is internet slang for a confident, unapologetic person who stays true to themselves.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["NEWTONIAN", "PHYSICS", "TEACHER", "PET", "SHOP", "GIRL", "POWER", "PLAY", "GROUND"],
        narrative: "NEWTONIAN PHYSICS refers to classical mechanics developed by Sir Isaac Newton. A PHYSICS TEACHER instructs students in science. A TEACHER'S PET is a favored student. A PET SHOP sells animals. A SHOP GIRL is a female retail worker. GIRL POWER is a slogan of female empowerment. A POWER PLAY is a strategic advantage, especially in hockey. A PLAYGROUND is a children's recreation area.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["LACONIC", "SPARTAN", "LIFESTYLE", "BRAND", "NAME", "PLATE", "GLASS", "HOUSE", "WORK"],
        narrative: "LACONIC means using few words, named after Laconia (Sparta) whose citizens were famously terse. A SPARTAN LIFESTYLE is austere and disciplined. A LIFESTYLE BRAND sells a way of living, not just products. A BRAND NAME is a trademarked product name. A NAMEPLATE identifies a person or place. PLATE GLASS is flat glass used in windows. A GLASSHOUSE is a greenhouse (or British slang for military prison). HOUSEWORK is domestic chores.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PTOLEMAIC", "MODEL", "HOME", "SICK", "NOTE", "WORTHY", "CAUSE", "WAY", "STATION"],
        narrative: "The PTOLEMAIC MODEL was the geocentric astronomical system developed by Claudius Ptolemy, placing Earth at the center of the universe. A MODEL HOME is a display house in a new development. HOMESICK is longing for home while away. A SICK NOTE is a doctor's excuse from work or school. NOTEWORTHY means deserving of attention. A WORTHY CAUSE is a charitable endeavor deserving support. A CAUSEWAY is a raised road over water or wetland. A WAY STATION is a stopping point on a journey.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SILVER", "BULLET", "JOURNAL", "ENTRY", "LEVEL", "PLAYING", "FIELD", "DAY", "DREAM"],
        narrative: "A SILVER BULLET is a simple solution to a complex problem. A BULLET JOURNAL is a customizable organization system. A JOURNAL ENTRY is a written record in a diary or ledger. ENTRY LEVEL refers to a beginner position in a career. A LEVEL PLAYING FIELD means fair and equal conditions for all. A PLAYING FIELD is a sports area for games. A FIELD DAY is a day of outdoor activities or a great success. A DAYDREAM is a pleasant fantasy while awake.",
        difficulty: 'EASY'
    },
    {
        solution: ["GUILTY", "PLEASURE", "CRUISE", "CONTROL", "FREAK", "ACCIDENT", "PRONE", "POSITION", "PAPER"],
        narrative: "A GUILTY PLEASURE is something enjoyable despite being considered lowbrow or embarrassing. A PLEASURE CRUISE is a vacation voyage for relaxation. CRUISE CONTROL is an automatic system that maintains vehicle speed. A CONTROL FREAK is someone who needs to be in charge of everything. A FREAK ACCIDENT is an unusual or bizarre mishap. ACCIDENT-PRONE describes someone likely to have accidents. The PRONE POSITION is lying face down. A POSITION PAPER is a formal statement of views on an issue.",
        difficulty: 'EASY'
    },
    {
        solution: ["BITTER", "SWEET", "HEART", "BREAK", "FAST", "FORWARD", "THINKING", "CAP", "STONE"],
        narrative: "BITTERSWEET describes something pleasant but tinged with sadness. SWEETHEART is a term of endearment for a loved one. HEARTBREAK is intense emotional pain from loss or disappointment. BREAKFAST is the first meal of the day. FAST FORWARD means to skip ahead quickly. FORWARD THINKING describes a progressive, future-oriented mindset. A THINKING CAP is a metaphor for mental focus and problem-solving. A CAPSTONE is a crowning achievement or final accomplishment.",
        difficulty: 'EASY'
    },
    {
        solution: ["WITCH", "CRAFT", "FAIR", "WEATHER", "PROOF", "POSITIVE", "THINKING", "MAN", "HUNT"],
        narrative: "WITCHCRAFT is the practice of magic or sorcery. A CRAFT FAIR is a market where artisans sell handmade goods. A FAIR-WEATHER friend is unreliable when times get tough. WEATHERPROOF means resistant to the effects of weather. PROOF POSITIVE is definite, undeniable evidence. POSITIVE THINKING is an optimistic mental attitude. A THINKING MAN is an intellectual or thoughtful person. A MANHUNT is an organized search for a person, typically a criminal.",
        difficulty: 'EASY'
    },
    {
        solution: ["DEAD", "HEAT", "WAVE", "POOL", "SIDE", "EFFECT", "PEDAL", "STEEL", "TRAP"],
        narrative: "A DEAD HEAT is a tie or draw in a race or competition. A HEAT WAVE is an extended period of unusually hot weather. A WAVE POOL is a swimming pool with artificially generated waves. POOLSIDE means located beside a swimming pool. A SIDE EFFECT is a secondary, often unintended consequence. An EFFECT PEDAL is a device that modifies guitar sound. PEDAL STEEL is a type of steel guitar played with foot pedals. A STEEL TRAP describes a sharp, quick mind (or a literal animal trap).",
        difficulty: 'EASY'
    },
    {
        solution: ["STRAW", "POLL", "TAX", "SHELTER", "ISLAND", "HOPPING", "MAD", "MAX", "OUT"],
        narrative: "A STRAW POLL is an informal vote to gauge opinion. A POLL TAX was a fee required to vote, historically used to disenfranchise minorities. A TAX SHELTER is a legal method to reduce taxable income. SHELTER ISLAND is a town in New York between the North and South Forks of Long Island. ISLAND HOPPING was the World War II military strategy of capturing Pacific islands to advance toward Japan. HOPPING MAD means extremely angry. MAD MAX is the post-apocalyptic film franchise starring Mel Gibson and later Tom Hardy. To MAX OUT means to reach the limit or exhaust a resource.",
        difficulty: 'HARD'
    },
    {
        solution: ["ACHILLES", "HEEL", "TURN", "PIKE", "PLACE", "KICK", "START", "UP", "SWING"],
        narrative: "An ACHILLES HEEL is a fatal weakness, from Greek mythology where Achilles was invulnerable except for his heel. A HEEL TURN is professional wrestling slang for when a good guy becomes a villain. A TURNPIKE is a toll road or highway. PIKE PLACE is the famous public market in Seattle, Washington. A PLACE KICK is a kick in football where the ball is held on the ground. To KICKSTART means to start something forcefully or jump-start a process. A START-UP is a newly established business, typically in tech. An UPSWING is an upward trend or improvement in conditions.",
        difficulty: 'HARD'
    },
    {
        solution: ["RUBBER", "DUCK", "DYNASTY", "WARRIOR", "CATS", "MEOW", "MIX", "MASTER", "CHEF"],
        narrative: "A RUBBER DUCK is a bath toy, also used in programming as a debugging technique where explaining code to an inanimate object helps find bugs. DUCK DYNASTY was a popular reality TV show about a Louisiana family's duck call business. DYNASTY WARRIORS is a hack-and-slash video game series by Koei. WARRIOR CATS is a bestselling young adult book series about clans of wild cats. The CAT'S MEOW is an idiom meaning something excellent or the height of fashion. MEOW MIX is a popular cat food brand known for its jingle. A MIX MASTER is DJ equipment for blending audio tracks. MASTERCHEF is a competitive cooking reality TV show.",
        difficulty: 'HARD'
    },
    {
        solution: ["POISON", "IVY", "LEAGUE", "TABLE", "MANNER", "BORN", "FREE", "KICK", "BOXER"],
        narrative: "POISON IVY is a plant that causes itchy rashes, and also a Batman villain. The IVY LEAGUE is the group of eight elite American universities including Harvard, Yale, and Princeton. A LEAGUE TABLE is a ranking chart showing competitive standings. TABLE MANNERS are the rules of etiquette for eating. 'To the MANNER BORN' is a Shakespeare phrase meaning accustomed to privilege from birth. BORN FREE is a 1966 film and song about Elsa the lioness being released into the wild. A FREE KICK is a direct or indirect kick awarded in soccer after a foul. A KICKBOXER is a martial artist who combines boxing with kicking techniques.",
        difficulty: 'HARD'
    },
    {
        solution: ["ELEPHANT", "GRAVEYARD", "SMASH", "MOUTH", "WASH", "OUT", "FIELD", "GOAL", "TENDER"],
        narrative: "An ELEPHANT GRAVEYARD is a mythical place where elephants go to die, famously depicted in Disney's The Lion King. A GRAVEYARD SMASH refers to the 1962 novelty song 'Monster Mash' ('It was a graveyard smash'). SMASH MOUTH is the rock band known for 'All Star' from the Shrek soundtrack. MOUTHWASH is an antiseptic liquid used for oral hygiene. A WASHOUT is a complete failure or disappointment. The OUTFIELD is the area of a baseball diamond beyond the infield. A FIELD GOAL is a scoring play in football (3 points) or basketball. A GOALTENDER (or goalkeeper) is the player who defends the goal in hockey or soccer.",
        difficulty: 'HARD'
    },
    {
        solution: ["KANGAROO", "COURT", "MARTIAL", "LAW", "ABIDING", "CITIZEN", "SOLDIER", "FIELD", "STRIP"],
        narrative: "A KANGAROO COURT is an illegitimate tribunal that ignores proper legal procedure. A COURT MARTIAL is a military court for trying armed forces personnel. MARTIAL LAW is temporary military rule over civilian affairs during emergencies. LAW-ABIDING means obeying the law. LAW ABIDING CITIZEN is a 2009 thriller film starring Gerard Butler and Jamie Foxx. CITIZEN SOLDIER is a 2006 song by 3 Doors Down and the slogan of the U.S. National Guard. SOLDIER FIELD is the historic Chicago stadium, home of the Chicago Bears. To FIELD STRIP is to disassemble a weapon for cleaning or inspection.",
        difficulty: 'HARD'
    },
    {
        solution: ["SITTING", "DUCK", "FACE", "HEEL", "STONE", "COLD", "TURKEY", "SHOOT", "MOON"],
        narrative: "A SITTING DUCK is an easy, defenseless target. DUCK FACE is the exaggerated pout pose popular in selfies. In professional wrestling, a FACE is a hero and a HEEL is a villain—a 'face/heel turn' means switching sides. The HEEL STONE is a large sarsen stone at Stonehenge. STONE COLD refers to wrestler Steve Austin or means completely cold. COLD TURKEY means quitting an addiction abruptly without tapering. A TURKEY SHOOT is a contest that's so easy it's like shooting sitting targets. To SHOOT THE MOON is to attempt something ambitious, or in the card game Hearts, to capture all penalty cards.",
        difficulty: 'HARD'
    },
    {
        solution: ["GOLDEN", "PARACHUTE", "PANTS", "ON", "FIRE", "DRILL", "SERGEANT", "PEPPER", "SPRAY"],
        narrative: "A GOLDEN PARACHUTE is a lucrative severance package for executives who lose their jobs. PARACHUTE PANTS are the baggy, nylon pants popularized by MC Hammer in the 1980s. 'PANTS ON FIRE' comes from the children's taunt 'Liar, liar, pants on fire.' ON FIRE means performing exceptionally well. A FIRE DRILL is an emergency evacuation practice. A DRILL SERGEANT is a military instructor known for strict discipline. SERGEANT PEPPER'S Lonely Hearts Club Band is the iconic 1967 Beatles album. PEPPER SPRAY is an inflammatory agent used for self-defense.",
        difficulty: 'HARD'
    },
    {
        solution: ["DUTCH", "TREAT", "WILLIAMS", "SONOMA", "VALLEY", "GIRL", "SCOUT", "HONOR", "ROLL"],
        narrative: "A DUTCH TREAT is an outing where each person pays for themselves. TREAT WILLIAMS was an American actor known for 'Hair' and 'Everwood.' WILLIAMS-SONOMA is an upscale American kitchenware retailer. SONOMA VALLEY is a renowned wine-producing region in Northern California. A VALLEY GIRL is a 1980s stereotype of materialistic young women from the San Fernando Valley, immortalized in Frank Zappa's 1982 song. A GIRL SCOUT is a member of the youth organization known for cookies and outdoor skills. SCOUT'S HONOR is a pledge of truthfulness. The HONOR ROLL is a list of students who achieve academic distinction.",
        difficulty: 'HARD'
    },
    {
        solution: ["TROJAN", "WAR", "CHEST", "HAIR", "TRIGGER", "HAPPY", "CAMPER", "VAN", "GOGH"],
        narrative: "The TROJAN WAR was the legendary Greek conflict over Helen of Troy, featuring the famous wooden horse. A WAR CHEST is a reserve of funds for a campaign or battle. CHEST HAIR is the body hair on a person's torso. A HAIR TRIGGER is an extremely sensitive gun trigger, or describes someone easily provoked. TRIGGER HAPPY means overly eager to shoot or react aggressively. A HAPPY CAMPER is someone who is content and satisfied. A CAMPER VAN is a recreational vehicle equipped for living and traveling. Vincent VAN GOGH was the Dutch Post-Impressionist painter famous for 'Starry Night' and his severed ear.",
        difficulty: 'HARD'
    },
    {
        solution: ["FROG", "LEGS", "DIAMOND", "BACK", "DOOR", "PRIZE", "PIG", "LATIN", "LOVER"],
        narrative: "FROG LEGS are a French culinary delicacy. LEGS DIAMOND was the nickname of Jack Diamond, a notorious Prohibition-era gangster. A DIAMONDBACK is a venomous rattlesnake named for the diamond pattern on its back, also the name of the Arizona baseball team. A BACK DOOR is a rear entrance, or a sneaky method of access. A DOOR PRIZE is a gift awarded by random drawing at an event. A PRIZE PIG is an award-winning pig at a county fair. PIG LATIN is a playful language game where syllables are rearranged ('igpay atinlay'). A LATIN LOVER is a stereotype of a romantic, passionate man from Southern Europe or Latin America.",
        difficulty: 'HARD'
    },
    {
        solution: ["BLUE", "BLOOD", "BATH", "SALT", "MINE", "FIELD", "HOCKEY", "STICK", "INSECT"],
        narrative: "BLUE BLOOD refers to aristocracy or noble lineage. A BLOODBATH is a massacre or extremely violent event. BATH SALTS are crystalline substances for bathing, also slang for dangerous synthetic drugs. A SALT MINE is where salt is extracted, or slang for a place of hard, tedious work ('back to the salt mines'). A MINEFIELD is an area planted with explosive mines, or any situation fraught with hidden dangers. FIELD HOCKEY is a team sport played on grass or turf with curved sticks. A HOCKEY STICK is the equipment used to hit the puck. A STICK INSECT is a bug that camouflages itself by resembling a twig.",
        difficulty: 'HARD'
    },
    {
        solution: ["MONKEY", "WRENCH", "GANG", "GREEN", "THUMB", "SCREW", "DRIVER", "ANT", "FARM"],
        narrative: "A MONKEY WRENCH is an adjustable spanner tool. 'The Monkey WRENCH GANG' is Edward Abbey's 1975 eco-sabotage novel about environmental activists in the Southwest. GANG GREEN was the nickname for the New York Jets' fearsome defense in the 1980s, also a pun on gangrene. A GREEN THUMB means natural skill at gardening. A THUMBSCREW is a medieval torture device that crushes fingers. A SCREWDRIVER is a tool for turning screws, also a vodka and orange juice cocktail. A DRIVER ANT is an aggressive African ant species known for massive swarm raids. An ANT FARM is an educational terrarium for observing ant colonies.",
        difficulty: 'HARD'
    },
    {
        solution: ["MAGIC", "MIKE", "TYSON", "FURY", "ROAD", "KILL", "JOY", "RIDE", "SHOTGUN"],
        narrative: "MAGIC MIKE is the 2012 film about male strippers starring Channing Tatum. MIKE TYSON is the legendary heavyweight boxing champion known for his ferocious knockouts. TYSON FURY is the British heavyweight champion known as 'The Gypsy King.' FURY ROAD is the subtitle of the 2015 film 'Mad Max: Fury Road.' ROADKILL is an animal killed by a vehicle on a road. A KILLJOY is a person who spoils others' fun. A JOYRIDE is a reckless drive taken for pleasure, often in a stolen car. To RIDE SHOTGUN means to sit in the front passenger seat, originating from stagecoach guards who rode with shotguns.",
        difficulty: 'HARD'
    },
    {
        solution: ["SILVER", "TONGUE", "LASHING", "OUT", "BREAK", "DANCING", "BEAR", "MARKET", "SHARE"],
        narrative: "A SILVER TONGUE describes someone gifted at persuasive or eloquent speech. A TONGUE LASHING is a harsh verbal scolding. LASHING OUT means attacking someone verbally or physically in anger. An OUTBREAK is a sudden occurrence of disease or violence. BREAK DANCING is an athletic street dance style originating in 1970s New York hip-hop culture. A DANCING BEAR was a circus attraction, also the name of a Grateful Dead icon and song. A BEAR MARKET is a period of declining stock prices, opposite of a bull market. MARKET SHARE is the percentage of total sales in an industry captured by a particular company.",
        difficulty: 'HARD'
    },
    {
        solution: ["WHISTLE", "STOP", "MOTION", "PICTURE", "PERFECT", "GAME", "BIRD", "WATCHING", "BRIEF"],
        narrative: "A WHISTLE STOP tour is a political campaign traveling to many small towns by train. STOP MOTION is an animation technique where objects are physically manipulated frame by frame. A MOTION PICTURE is a film or movie. PICTURE PERFECT means flawless or ideal. A PERFECT GAME in baseball is when a pitcher allows no batters to reach base. A GAME BIRD is a bird hunted for sport, like pheasant or quail. BIRD WATCHING is the hobby of observing birds in their natural habitat. A WATCHING BRIEF is a legal term for monitoring court proceedings without actively participating.",
        difficulty: 'HARD'
    },
    {
        solution: ["YELLOW", "BRICK", "ROAD", "WARRIOR", "PRINCESS", "CUT", "THROAT", "SINGER", "SONGWRITER"],
        narrative: "The YELLOW BRICK Road is the famous path to the Emerald City in 'The Wizard of Oz.' A BRICK ROAD is a street paved with bricks. A ROAD WARRIOR is someone who travels frequently for work, also the subtitle of 'Mad Max 2.' WARRIOR PRINCESS refers to Xena from the TV series 'Xena: Warrior Princess.' A PRINCESS CUT is a square-shaped diamond cut. CUTTHROAT means ruthlessly competitive. A THROAT SINGER practices the ancient vocal technique from Tuva and Mongolia where multiple pitches are produced simultaneously. A SINGER-SONGWRITER is a musician who writes and performs their own songs.",
        difficulty: 'HARD'
    },
    {
        solution: ["SMOKE", "SIGNAL", "FIRE", "STARTER", "MOTOR", "CITY", "LIGHTS", "CAMERA", "SHY"],
        narrative: "A SMOKE SIGNAL is an ancient form of long-distance communication using puffs of smoke. A SIGNAL FIRE is a beacon lit to send a message or warning. 'FIRESTARTER' is a 1997 hit song by The Prodigy, also someone who starts fires. A STARTER MOTOR is the electric motor that initiates an engine. MOTOR CITY is the nickname for Detroit, home of the American auto industry. 'CITY LIGHTS' is Charlie Chaplin's beloved 1931 silent film. 'LIGHTS, CAMERA, Action!' is the traditional film set command. CAMERA SHY describes someone uncomfortable being photographed or filmed.",
        difficulty: 'HARD'
    },
    {
        solution: ["COLD", "OPEN", "SESAME", "STREET", "SMART", "ALECK", "BALDWIN", "BROTHERS", "KEEPER"],
        narrative: "A COLD OPEN is a TV or film technique that begins without the usual title sequence or introduction. 'OPEN SESAME' is the magic phrase from 'Ali Baba and the Forty Thieves.' SESAME STREET is the beloved children's educational TV show that began in 1969. STREET SMART means having practical knowledge gained from urban experience. A SMART ALECK is someone who is annoyingly clever or sarcastic. ALEC BALDWIN is the acclaimed actor known for '30 Rock' and his SNL Trump impression. The BALDWIN BROTHERS are the acting family including Alec, Daniel, William, and Stephen. 'Am I my BROTHER'S KEEPER?' is the famous biblical question from Cain in Genesis.",
        difficulty: 'HARD'
    },
    {
        solution: ["GLASS", "HALF", "NELSON", "COLUMN", "INCH", "WORM", "FOOD", "BABY", "BOOMER"],
        narrative: "The 'GLASS HALF full or empty' question is a classic test of optimism versus pessimism. A HALF NELSON is a wrestling hold where one arm is passed under the opponent's arm and behind their neck. NELSON'S COLUMN is the monument in London's Trafalgar Square honoring Admiral Horatio Nelson. A COLUMN INCH is a unit of newspaper space measuring one column wide by one inch tall. An INCHWORM is a caterpillar that moves by looping its body. WORM FOOD is dark slang for being dead and buried. A FOOD BABY is the bloated stomach appearance after eating a large meal. A BABY BOOMER is someone born during the post-World War II population boom (1946-1964).",
        difficulty: 'HARD'
    },
    {
        solution: ["SNOW", "BALL", "GAME", "TIME", "LINE", "UP", "GRADE", "SCHOOL", "WORK"],
        narrative: "Start with winter fun: a SNOWBALL is a packed ball of snow. A BALL GAME is any sports event played with a ball. GAME TIME is when the action begins. A TIMELINE is a chronological sequence of events. LINE UP means to arrange in order or queue. UPGRADE means to improve or enhance. GRADE SCHOOL is another term for elementary school. SCHOOLWORK refers to homework and assignments.",
        difficulty: 'EASY'
    },
    {
        solution: ["SUN", "FLOWER", "POT", "HOLE", "PUNCH", "LINE", "DANCE", "FLOOR", "PLAN"],
        narrative: "A SUNFLOWER is a tall yellow bloom that follows the sun. A FLOWER POT is a container for growing plants. A POTHOLE is a hole in the road surface. A HOLE PUNCH is an office tool for making holes in paper. A PUNCH LINE is the funny ending of a joke. LINE DANCE is a type of country dancing done in rows. A DANCE FLOOR is where people boogie. A FLOOR PLAN is a building's layout diagram.",
        difficulty: 'EASY'
    },
    {
        solution: ["STAR", "LIGHT", "HOUSE", "HOLD", "UP", "KEEP", "SAKE", "CUP", "BOARD"],
        narrative: "STARLIGHT is the gentle glow from distant stars. A LIGHTHOUSE is a coastal beacon guiding ships. A HOUSEHOLD is your family unit or home. HOLD UP can mean a robbery or a delay. UPKEEP refers to maintenance and care. A KEEPSAKE is a treasured memento. A SAKE CUP is a small Japanese vessel for drinking rice wine. A CUPBOARD is a kitchen cabinet for storage.",
        difficulty: 'EASY'
    },
    {
        solution: ["SAND", "STORM", "CLOUD", "NINE", "LIVES", "STOCK", "MARKET", "PLACE", "MAT"],
        narrative: "A SANDSTORM is a desert weather phenomenon with blowing sand. A STORM CLOUD is a dark cloud signaling bad weather. CLOUD NINE means a state of extreme happiness. NINE LIVES refers to the saying about cats' resilience. LIVESTOCK are farm animals raised for food or work. The STOCK MARKET is where shares are traded. A MARKETPLACE is a venue for buying and selling. A PLACE MAT is a protective table setting.",
        difficulty: 'EASY'
    },
    {
        solution: ["MOON", "SHINE", "BOX", "TURTLE", "NECK", "TIE", "BREAK", "EVEN", "HANDED"],
        narrative: "MOONSHINE is illegally distilled alcohol, also called white lightning. A SHINE BOX is a kit for polishing shoes. A BOX TURTLE is a land-dwelling turtle with a domed shell. A TURTLENECK is a sweater with a high, close-fitting collar. A NECK TIE is a formal accessory worn around the collar. A TIE BREAKER is a deciding game or point. BREAK EVEN means neither profit nor loss. EVEN HANDED means fair and impartial.",
        difficulty: 'EASY'
    },
    {
        solution: ["TRASH", "PANDA", "BEAR", "CUB", "REPORTER", "NOTEBOOK", "COMPUTER", "VIRUS", "SCAN"],
        narrative: "TRASH PANDA is slang for a raccoon, those masked bandits of the garbage bins. A PANDA BEAR is the beloved black-and-white bamboo eater from China. A BEAR CUB is a baby bear. A CUB REPORTER is a junior journalist learning the ropes. A REPORTER'S NOTEBOOK is the spiral-bound tool of the trade. A NOTEBOOK COMPUTER is another name for a laptop. A COMPUTER VIRUS is malicious software. A VIRUS SCAN is what your antivirus runs to protect you.",
        difficulty: 'EASY'
    },
    {
        solution: ["BANANA", "REPUBLIC", "PARTY", "ANIMAL", "FARM", "HOUSE", "MUSIC", "CITY", "SLICKER"],
        narrative: "BANANA REPUBLIC is both a clothing store and a term for an unstable government dependent on a single export. The REPUBLICAN PARTY is the GOP. A PARTY ANIMAL is someone who loves to celebrate. ANIMAL FARM is George Orwell's satirical novella about power and corruption. A FARMHOUSE is a rural dwelling. HOUSE MUSIC is an electronic dance genre born in Chicago. MUSIC CITY is Nashville's famous nickname. A CITY SLICKER is an urban person unfamiliar with rural life.",
        difficulty: 'EASY'
    },
    {
        solution: ["CARBON", "NEUTRAL", "ZONE", "DEFENSE", "ATTORNEY", "GENERAL", "STORE", "CREDIT", "CARD"],
        narrative: "CARBON NEUTRAL means having a net-zero carbon footprint. The NEUTRAL ZONE is hockey's center ice area (and a Star Trek reference). ZONE DEFENSE is a basketball strategy where players guard areas rather than individuals. A DEFENSE ATTORNEY represents defendants in court. The ATTORNEY GENERAL is the nation's top legal officer. A GENERAL STORE is an old-fashioned shop selling everything. STORE CREDIT is a refund option. A CREDIT CARD is a ubiquitous payment method.",
        difficulty: 'EASY'
    },
    {
        solution: ["FOSSIL", "FUEL", "TANK", "TOP", "DOLLAR", "STORE", "BOUGHT", "TIME", "WARP"],
        narrative: "FOSSIL FUEL includes coal, oil, and natural gas formed from ancient organisms. A FUEL TANK stores gasoline in vehicles. A TANK TOP is a sleeveless shirt. TOP DOLLAR means paying the highest price. A DOLLAR STORE sells items cheaply. STORE BOUGHT means not homemade. BOUGHT TIME means you delayed the inevitable. TIME WARP is the Rocky Horror dance and a sci-fi concept of temporal distortion.",
        difficulty: 'EASY'
    },
    {
        solution: ["FLASH", "MOB", "BOSS", "FIGHT", "BACK", "HAND", "SHAKE", "DOWN", "POUR"],
        narrative: "A FLASH MOB is a spontaneous public performance organized via social media. A MOB BOSS is a crime family leader like Don Corleone. A BOSS FIGHT is a video game's climactic battle against a powerful enemy. FIGHT BACK means to resist or retaliate. A BACKHAND is a tennis stroke hit with the back of the hand facing forward. A HANDSHAKE is a greeting or agreement gesture. A SHAKEDOWN is extortion or a thorough search. A DOWNPOUR is heavy rainfall.",
        difficulty: 'EASY'
    },
    {
        solution: ["PARALLEL", "PARKING", "GARAGE", "SALE", "PITCH", "PERFECT", "STORM", "CHASER", "LIGHTS"],
        narrative: "PARALLEL PARKING is the tricky driving maneuver that tests every new driver. A PARKING GARAGE is a multi-level structure for vehicles. A GARAGE SALE is a yard sale held in your driveway. A SALES PITCH is a persuasive presentation. PITCH PERFECT is the 2012 a cappella comedy film (and means musically accurate). A PERFECT STORM describes ideal conditions for disaster. A STORM CHASER hunts tornadoes for science or thrills. CHASER LIGHTS are sequential lights like those on theater marquees.",
        difficulty: 'EASY'
    },
    {
        solution: ["CONTINENTAL", "BREAKFAST", "CLUB", "SANDWICH", "ARTIST", "STATEMENT", "NECKLACE", "CHAIN", "SAW"],
        narrative: "A CONTINENTAL BREAKFAST is the light hotel breakfast with pastries and coffee. THE BREAKFAST CLUB is John Hughes' iconic 1985 teen drama. A CLUB SANDWICH is a triple-decker with turkey, bacon, and tomato. A SANDWICH ARTIST is Subway's official title for their employees. An ARTIST STATEMENT explains the meaning behind creative work. A STATEMENT NECKLACE is bold, eye-catching jewelry. A NECKLACE CHAIN is the metal links that hold a pendant. A CHAINSAW is the powerful cutting tool.",
        difficulty: 'EASY'
    },
    {
        solution: ["METROPOLITAN", "TRANSIT", "AUTHORITY", "FIGURE", "EIGHT", "BALL", "PIT", "BULL", "DOG"],
        narrative: "A METROPOLITAN TRANSIT system serves urban areas. A TRANSIT AUTHORITY is the agency running public transportation. An AUTHORITY FIGURE is someone in a position of power. A FIGURE EIGHT is a skating move and a shape. An EIGHT BALL is the black ball in pool (and a fortune-telling toy). A BALL PIT is the colorful play area at kids' venues. A PIT BULL is the powerful dog breed. A BULLDOG is the wrinkly, stocky dog breed known for tenacity.",
        difficulty: 'EASY'
    },
    {
        solution: ["EXECUTIVE", "BRANCH", "OFFICE", "MANAGER", "TRAINEE", "PROGRAM", "DIRECTOR", "CUT", "SCENE"],
        narrative: "The EXECUTIVE BRANCH is one of three branches of US government. A BRANCH OFFICE is a satellite location of a company. An OFFICE MANAGER handles administrative duties. A MANAGER TRAINEE is learning the ropes of leadership. A TRAINEE PROGRAM develops new employees. A PROGRAM DIRECTOR oversees operations or content. A DIRECTOR'S CUT is an alternate film version with the director's vision. A CUT SCENE is a video game cinematic that advances the story.",
        difficulty: 'EASY'
    },
    {
        solution: ["HELICOPTER", "PARENT", "COMPANY", "PICNIC", "BLANKET", "STATEMENT", "NECKLACE", "PENDANT", "LIGHT"],
        narrative: "A HELICOPTER PARENT hovers over their children obsessively. A PARENT COMPANY owns other businesses. A COMPANY PICNIC is a corporate team-building outing. A PICNIC BLANKET is spread on the grass for outdoor dining. A BLANKET STATEMENT is an overgeneralization. A STATEMENT NECKLACE is bold, attention-grabbing jewelry. A NECKLACE PENDANT is the decorative piece hanging from a chain. A PENDANT LIGHT is a hanging light fixture suspended from the ceiling.",
        difficulty: 'EASY'
    },
    {
        solution: ["JURASSIC", "WORLD", "CUP", "CAKE", "BOSS", "BATTLE", "CRY", "BABY", "SHARK"],
        narrative: "JURASSIC WORLD is the 2015 dinosaur blockbuster. The WORLD CUP is FIFA's global soccer tournament. A CUPCAKE is a small frosted dessert. CAKE BOSS is the TLC reality show about Buddy Valastro's bakery. A BOSS BATTLE is a video game's climactic fight against a powerful enemy. A BATTLE CRY is a war shout. CRY BABY is someone who whines excessively (or the 1990 Johnny Depp film). BABY SHARK is the viral children's song that took over the internet.",
        difficulty: 'EASY'
    },
    {
        solution: ["MILKY", "WAY", "FINDER", "FEE", "SIMPLE", "JACK", "KNIFE", "EDGE", "CASE"],
        narrative: "The MILKY WAY is our home galaxy (and a candy bar). A WAYFINDER is a navigation tool used in Polynesian seafaring. A FINDER'S FEE is payment for a successful referral. FEE SIMPLE is a type of property ownership in real estate law. SIMPLE JACK is Ben Stiller's character in Tropic Thunder. A JACKKNIFE is a folding pocket knife (or a truck accident type). KNIFE EDGE describes something precarious or a sharp boundary. An EDGE CASE is a programming term for unusual boundary conditions.",
        difficulty: 'HARD'
    },
    {
        solution: ["SPOTIFY", "PREMIUM", "BOND", "VILLAIN", "ORIGIN", "STORY", "ARC", "REACTOR", "CORE"],
        narrative: "SPOTIFY PREMIUM is the paid tier of the music streaming service. A PREMIUM BOND is a UK government savings product. A BOND VILLAIN is an antagonist in the James Bond franchise. A VILLAIN ORIGIN explains how a bad guy became evil. An ORIGIN STORY is a superhero's backstory. A STORY ARC is a narrative structure spanning multiple episodes. An ARC REACTOR is Tony Stark's power source in Iron Man. A REACTOR CORE is the central part of a nuclear reactor.",
        difficulty: 'EASY'
    },
    {
        solution: ["BUNSEN", "BURNER", "PHONE", "CALL", "BACK", "STORY", "BOARD", "SHORTS", "STOP"],
        narrative: "A BUNSEN BURNER is the lab heating device named after Robert Bunsen. A BURNER PHONE is a disposable prepaid phone. A PHONE CALL is basic communication. A CALLBACK is a return call or an audition invitation. A BACKSTORY is a character's history. A STORYBOARD is visual planning for film/animation. BOARD SHORTS are swim trunks. A SHORT STOP is the baseball position between second and third base.",
        difficulty: 'EASY'
    },
    {
        solution: ["SQUID", "INK", "WELL", "DONE", "DEAL", "FLOW", "STATE", "FARM", "FRESH"],
        narrative: "SQUID INK is used in pasta and other dishes. An INK WELL is a container for writing ink. WELL DONE means thoroughly cooked (or congratulations). A DONE DEAL is a completed agreement. DEAL FLOW is a business term for the rate of investment opportunities. FLOW STATE is the psychology term for being 'in the zone.' STATE FARM is the insurance company ('Like a good neighbor...'). FARM FRESH describes produce straight from the source.",
        difficulty: 'EASY'
    },
    {
        solution: ["SPACE", "COWBOY", "BOOT", "LEG", "DAY", "WALKER", "TEXAS", "TOAST", "MASTER"],
        narrative: "A SPACE COWBOY is a Steve Miller Band song and an anime (Cowboy Bebop). A COWBOY BOOT is iconic Western footwear. A BOOTLEG is an illegal copy of media. LEG DAY is the dreaded gym day that fitness bros skip. A DAY WALKER is a vampire who can walk in sunlight, like Blade. WALKER, TEXAS Ranger is Chuck Norris's legendary TV series. TEXAS TOAST is thick-sliced garlic bread. A TOASTMASTER is a member of the public speaking organization.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FYRE", "FESTIVAL", "SEASON", "TICKET", "SCALP", "MASSAGE", "PARLOR", "TRICK", "SHOT"],
        narrative: "FYRE FESTIVAL was the infamous 2017 scam that stranded influencers in the Bahamas. FESTIVAL SEASON is the summer period packed with music events. A SEASON TICKET grants admission to all games or shows. To TICKET SCALP is to resell tickets at inflated prices. A SCALP MASSAGE relieves tension. A MASSAGE PARLOR offers therapeutic (or sometimes illicit) services. A PARLOR TRICK is a simple magic act. A TRICK SHOT is an impressive pool or basketball shot.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SOFT", "LAUNCH", "PARTY", "HARDY", "BOYS", "TOWN", "DRUNK", "TEXT", "WALL"],
        narrative: "A SOFT LAUNCH is when you subtly introduce a new relationship on social media. A LAUNCH PARTY celebrates a new product or venture. To PARTY HARDY is slang for partying enthusiastically. The HARDY BOYS are the teen detective duo from the classic book series. BOYS TOWN is the famous youth care organization founded in Nebraska. The TOWN DRUNK is the stereotypical village alcoholic. A DRUNK TEXT is an embarrassing message sent while intoxicated. A TEXT WALL is an overwhelming, unbroken block of text.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TOUCH", "GRASS", "WIDOW", "PEAK", "OIL", "PULL", "QUOTE", "TWEET", "STORM"],
        narrative: "To TOUCH GRASS is internet slang for 'go outside and touch reality.' A GRASS WIDOW is an old-fashioned term for a woman whose husband is away. A WIDOW'S PEAK is the V-shaped hairline on the forehead. PEAK OIL is the theory that global oil production has or will reach maximum output. OIL PULLING is a wellness trend of swishing oil in your mouth. A PULL QUOTE is an excerpt highlighted in an article. A QUOTE TWEET is sharing someone's tweet with added commentary. A TWEETSTORM is a rapid series of connected tweets on a topic.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DUMPSTER", "FIRE", "SALE", "BARN", "DOOR", "DASH", "CAM", "GIRL", "BOSS"],
        narrative: "A DUMPSTER FIRE is internet slang for a complete disaster. A FIRE SALE is an urgent sale at steep discounts. A SALE BARN is where livestock are auctioned. A BARN DOOR is a large hinged door on a farm building. DOOR DASH is the food delivery service. A DASH CAM is a dashboard camera in a vehicle. A CAM GIRL is a woman who performs live on webcam for paying viewers. A GIRL BOSS is the controversial term for a female entrepreneur.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["STARBUCKS", "LATTE", "ART", "DECO", "RATE", "CARD", "GAME", "FACE", "VALUE"],
        narrative: "STARBUCKS is a famous coffee chain. A LATTE is a coffee drink. LATTE ART is the decorative patterns made in coffee foam. ART DECO is an artistic style from the 1920s. To DECO RATE is to decorate something. A RATE CARD lists pricing information. A CARD GAME is played with cards. A GAME FACE is a serious expression. FACE VALUE is the apparent worth or literal price printed on something.",
        difficulty: 'HARD'
    },
    {
        solution: ["NETFLIX", "ORIGINAL", "RECIPE", "BOX", "SPRING", "WATER", "BOTTLE", "CAP", "OFF"],
        narrative: "NETFLIX is a streaming service. A NETFLIX ORIGINAL is a show produced exclusively for the platform. An ORIGINAL RECIPE is authentic cooking instructions. A RECIPE BOX stores cooking instructions. A BOX SPRING supports a mattress. SPRING WATER comes from natural springs. A WATER BOTTLE holds drinks. A BOTTLE CAP seals the container. To CAP OFF is to complete something.",
        difficulty: 'HARD'
    },
    {
        solution: ["MICROSOFT", "WINDOWS", "DOWN", "PAYMENT", "PROCESSOR", "SPEED", "LIMIT", "BREAK", "FAST"],
        narrative: "MICROSOFT is a software company. MICROSOFT WINDOWS is their operating system. WINDOWS DOWN means lowering car windows. A DOWN PAYMENT is an initial purchase amount. A PAYMENT PROCESSOR handles transactions. A computer has a PROCESSOR SPEED. A SPEED LIMIT regulates traffic. To LIMIT BREAK is to exceed boundaries. BREAKFAST is the morning meal.",
        difficulty: 'HARD'
    },
    {
        solution: ["GOOGLE", "CHROME", "DOME", "LIGHT", "BULB", "GARDEN", "PARTY", "FAVOR", "BANK"],
        narrative: "GOOGLE CHROME is a popular web browser. A CHROME DOME is slang for a bald head. A DOME LIGHT is a ceiling light in a car. A LIGHT BULB produces illumination. A BULB GARDEN is planted with flowering bulbs. A GARDEN PARTY is an outdoor social gathering. A PARTY FAVOR is a small gift given to guests. A FAVOR BANK refers to accumulated social goodwill in relationships.",
        difficulty: 'HARD'
    },
    {
        solution: ["REDDIT", "KARMA", "POLICE", "OFFICER", "FRIENDLY", "FIRE", "WOOD", "BEAM", "JOIST"],
        narrative: "REDDIT KARMA is the point system on the Reddit platform. KARMA POLICE is a song by Radiohead. A POLICE OFFICER enforces the law. OFFICER FRIENDLY is a community policing term. FRIENDLY FIRE is accidental attack on one's own forces. FIREWOOD is wood used for burning. A WOOD BEAM is a structural support made of timber. A BEAM JOIST is a horizontal support member in construction.",
        difficulty: 'HARD'
    },
    {
        solution: ["THUNDER", "STORM", "CELLAR", "DOOR", "HINGE", "JOINT", "PAIN", "KILLER", "WHALE"],
        narrative: "A THUNDER STORM can be loud and intense. A STORM CELLAR is a shelter for severe weather. A CELLAR DOOR leads down to a cellar. A DOOR HINGE lets a door swing. A HINGE JOINT is a joint like a knee or elbow. JOINT PAIN is aching in those areas. A PAIN KILLER relieves pain. A KILLER WHALE is an orca.",
        difficulty: 'EASY'
    },
    {
        solution: ["LUCKY", "BREAK", "THROUGH", "LINE", "DANCING", "SHOES", "BOX", "SEAT", "BELT"],
        narrative: "A LUCKY BREAK is a sudden stroke of good fortune. A BREAKTHROUGH is a significant discovery or development. A THROUGH LINE is a consistent theme or plot element. LINE DANCING is a choreographed dance in rows. You wear DANCING SHOES when you go out. A SHOEBOX stores your footwear. A BOX SEAT is a premium seat in a theater. A SEAT BELT is a safety restraint in a car.",
        difficulty: 'EASY'
    },
    {
        solution: ["COFFEE", "FILTER", "WATER", "COLOR", "WHEEL", "CHAIR", "MAN", "KIND", "HEART"],
        narrative: "A COFFEE FILTER is used to brew your morning joe. FILTER WATER is cleaned for drinking. WATERCOLOR is a translucent painting medium. A COLOR WHEEL shows the relationships between different hues. A WHEELCHAIR is used for mobility. A CHAIRMAN is the presiding officer of a meeting. MANKIND refers to the human race. A KIND HEART describes someone with a compassionate nature.",
        difficulty: 'EASY'
    },
    {
        solution: ["SILVER", "SURFER", "DUDE", "RANCH", "HAND", "CREAM", "PUFF", "PASTRY", "CHEF"],
        narrative: "The SILVER SURFER is a comic book hero. A SURFER DUDE is a classic beach stereotype. A DUDE RANCH offers a cowboy experience. A RANCH HAND tends to livestock. HAND CREAM moisturizes dry skin. A CREAM PUFF is a sweet treat. PUFF PASTRY is light, flaky dough. A PASTRY CHEF creates desserts.",
        difficulty: 'EASY'
    },
    {
        solution: ["RAGE", "BAIT", "CAR", "SICK", "BURN", "BOOK", "TUBE", "SOCK", "HOP"],
        narrative: "RAGE BAIT is internet content designed to provoke fury for clicks. A BAIT CAR is a police sting vehicle left unlocked to catch thieves. Getting CAR SICK is motion sickness from driving. A SICK BURN is slang for a devastating insult. A BURN BOOK is the infamous slam notebook from 'Mean Girls'. BOOK TUBE is the YouTube community for book reviewers. A TUBE SOCK is the elastic-topped athletic sock. A SOCK HOP was a 1950s school dance where teens removed their shoes to protect the gym floor.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HATE", "CLICK", "FARM", "TEAM", "ROCKET", "SCIENCE", "FAIR", "TRADE", "WAR"],
        narrative: "A HATE CLICK is when you engage with content you despise. A CLICK FARM uses fake accounts to boost engagement metrics. A FARM TEAM is a minor league affiliate that develops players. TEAM ROCKET is the bumbling villain trio from Pokémon. 'It's not ROCKET SCIENCE' means something isn't complicated. A SCIENCE FAIR displays student experiments. FAIR TRADE ensures ethical sourcing. A TRADE WAR is an economic conflict through tariffs.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["RENT", "FREE", "SPIRIT", "ANIMAL", "CROSSING", "SWORDS", "MAN", "CHILD", "BRIDE"],
        narrative: "When someone lives RENT FREE in your head, they occupy your thoughts without permission. A FREE SPIRIT lives unconventionally. A SPIRIT ANIMAL is a creature that represents your essence (though appropriated from Indigenous cultures). ANIMAL CROSSING is Nintendo's life-simulation game where you pay off a tanuki's mortgage. CROSSING SWORDS means engaging in conflict—or is the Hulu adult cartoon. A SWORDSMAN is a skilled blade fighter. A MAN CHILD is an adult who refuses to mature. A CHILD BRIDE is a disturbing reality in some parts of the world.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DANK", "MEME", "STOCK", "BROKER", "DEALER", "PLATE", "ARMOR", "PIERCING", "SCREAM"],
        narrative: "A DANK MEME is an ironic or surreal internet joke appreciated by connoisseurs. A MEME STOCK is a share that goes viral on Reddit, like GameStop. A STOCK BROKER executes trades for clients. A BROKER DEALER both advises and trades securities. A DEALER PLATE is the special license plate used by car dealerships. PLATE ARMOR is medieval full-body protection. ARMOR PIERCING rounds penetrate protective materials. A PIERCING SCREAM is a high-pitched shriek that could shatter glass.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TRAUMA", "DUMP", "TRUCK", "NUT", "JOB", "FAIR", "SHAKE", "WEIGHT", "ROOM"],
        narrative: "A TRAUMA DUMP is when someone unloads their emotional baggage without warning. A DUMP TRUCK hauls materials to construction sites. TRUCK NUTS are the crude dangling accessories mounted on trailer hitches. A NUT JOB is slang for a crazy person—or the 2014 animated heist film. A JOB FAIR helps unemployed people find work. A FAIR SHAKE is an honest chance at something. A SHAKE WEIGHT is the infomercial fitness device with suggestive motion. A WEIGHT ROOM is where athletes pump iron.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HORSE", "FLY", "FISHING", "POLE", "VAULT", "DOOR", "STEP", "MOTHER", "LOAD"],
        narrative: "A HORSE FLY is a large biting insect that torments livestock. FLY FISHING is the angling technique using artificial flies as lures. A FISHING POLE is the rod used to cast a line. POLE VAULT is the track and field event using a flexible pole to clear a bar. A VAULT DOOR is the heavy entrance to a bank's secure storage. A DOORSTEP is the threshold where visitors and packages arrive. A STEPMOTHER is a parent's spouse who is not one's biological parent. To hit the MOTHERLOAD is to discover the richest vein of ore or strike it big.",
        difficulty: 'HARD'
    },
    {
        solution: ["STEAM", "ROLLER", "DERBY", "HAT", "BOX", "ELDER", "BERRY", "JUICE", "BAR"],
        narrative: "A STEAMROLLER is a heavy vehicle that compacts road surfaces. ROLLER DERBY is a contact sport where skaters race around an oval track. A DERBY HAT is the bowler-style hat traditionally worn at the Kentucky Derby. A HAT BOX is a circular container for storing fine hats. A BOX ELDER is a fast-growing maple tree native to North America. ELDERBERRY is a dark purple fruit used in syrups and wine. BERRY JUICE is a drink made from crushed berries. A JUICE BAR serves fresh-pressed beverages.",
        difficulty: 'HARD'
    },
    {
        solution: ["SNAP", "DRAGON", "FLY", "WHEEL", "BARROW", "BOY", "TOY", "POODLE", "SKIRT"],
        narrative: "A SNAPDRAGON is a colorful flower that opens and closes like a mouth. A DRAGONFLY is an iridescent insect with translucent wings. A FLYWHEEL stores rotational energy in engines. A WHEELBARROW is a cart for hauling garden materials. A BARROW BOY is British slang for a street vendor selling from a wheeled cart. A BOY TOY is slang for an attractive younger man. A TOY POODLE is the smallest variety of the poodle breed. A POODLE SKIRT is the iconic 1950s circle skirt often decorated with a poodle appliqué.",
        difficulty: 'HARD'
    },
    {
        solution: ["PENNY", "STOCK", "PILE", "DRIVER", "LICENSE", "FEE", "WAIVER", "WIRE", "CUTTER"],
        narrative: "A PENNY STOCK is a low-priced share typically trading under $5. A STOCKPILE is an accumulated reserve of materials. A PILE DRIVER is construction equipment that hammers posts into the ground. A DRIVER'S LICENSE is the permit allowing you to operate a vehicle. A LICENSE FEE is a charge for obtaining permission or authorization. A FEE WAIVER excuses someone from paying required costs. The WAIVER WIRE is where fantasy sports managers claim dropped players. A WIRE CUTTER is a tool for snipping through cables and fencing.",
        difficulty: 'HARD'
    },
    {
        solution: ["STEAM", "BATH", "ROBE", "HOOK", "NOSE", "DIVE", "BAR", "GRAPH", "PAPER"],
        narrative: "A STEAM BATH is a room filled with hot vapor for relaxation. A BATHROBE is the garment worn after bathing. A ROBE HOOK is a wall-mounted fixture for hanging towels and robes. A HOOK NOSE describes a prominently curved nasal bridge. A NOSEDIVE is a steep, sudden plunge downward. A DIVE BAR is a no-frills, unpretentious neighborhood watering hole. A BAR GRAPH displays data using rectangular bars. GRAPH PAPER has a grid of lines for plotting charts and diagrams.",
        difficulty: 'HARD'
    },
    {
        solution: ["ORANGE", "PEEL", "BACK", "LOG", "JAM", "SESSION", "PLAYER", "COACH", "HOUSE"],
        narrative: "An ORANGE PEEL is the citrus fruit's outer skin. To PEEL BACK means to uncover or reveal. A BACKLOG is an accumulation of unfinished work. A LOG JAM is a blockage of floating logs or a standstill. A JAM SESSION is an informal gathering of musicians improvising together. A SESSION PLAYER is a hired studio musician. A PLAYER COACH is an athlete who also manages the team. A COACH HOUSE is a small dwelling originally used to store carriages.",
        difficulty: 'EASY'
    },
    {
        solution: ["PINE", "TREE", "TOP", "GUN", "FIRE", "ESCAPE", "ROUTE", "MAP", "QUEST"],
        narrative: "A PINE TREE is an evergreen conifer. A TREETOP is the highest branches of a tree. TOP GUN is slang for the best pilot or the famous movie. GUNFIRE is the discharge of firearms. A FIRE ESCAPE is an emergency exit route from a building. An ESCAPE ROUTE is a path to safety. A ROUTE MAP shows directions for a journey. MAPQUEST is the online navigation service.",
        difficulty: 'EASY'
    },
    {
        solution: ["WIND", "MILL", "POND", "WEED", "KILLER", "BEE", "STING", "RAY", "GUN"],
        narrative: "A WINDMILL is a structure that harnesses wind power. A MILL POND is the body of water that powers a mill. PONDWEED is aquatic vegetation that grows in ponds. WEED KILLER is an herbicide that eliminates unwanted plants. A KILLER BEE is an aggressive Africanized honey bee. A BEE STING is the painful injection from a bee's stinger. A STINGRAY is a flat ocean fish with a venomous tail. A RAY GUN is a science fiction weapon that shoots beams of energy.",
        difficulty: 'EASY'
    },
    {
        solution: ["JELLY", "FISH", "CAKE", "TIN", "ROOF", "TOP", "KNOT", "HEAD", "STONE"],
        narrative: "A JELLYFISH is a translucent sea creature with tentacles. A FISH CAKE is a fried patty made of fish and potato. A CAKE TIN is a baking pan for cakes. A TIN ROOF is a metal roofing material. A ROOFTOP is the outer surface of a building's roof. A TOPKNOT is a hairstyle where hair is gathered at the crown. A KNOTHEAD is slang for a foolish person. A HEADSTONE is a grave marker in a cemetery.",
        difficulty: 'EASY'
    },
    {
        solution: ["CANDLE", "WAX", "PAPER", "CLIP", "ART", "WORK", "BENCH", "MARK", "SHEET"],
        narrative: "CANDLE WAX is the material that forms a candle. WAX PAPER is coated paper used for food storage. A PAPER CLIP is a bent wire for holding papers together. CLIP ART is ready-made digital images. ARTWORK is a piece of creative visual expression. A WORKBENCH is a sturdy table for crafting or repairs. A BENCHMARK is a standard for comparison. A MARK SHEET is a document recording grades or scores.",
        difficulty: 'EASY'
    },
    {
        solution: ["TOM", "CRUISE", "SHIP", "FOOLS", "GOLD", "STATUE", "LIBERTY", "BELL", "PEPPER"],
        narrative: "TOM CRUISE is the iconic Hollywood actor known for blockbuster action films. A CRUISE SHIP is a large vessel designed for pleasure voyages. SHIP OF FOOLS is a classic allegory about society going astray. FOOL'S GOLD is the nickname for pyrite, a mineral mistaken for real gold. A GOLD STATUE is a gleaming metallic sculpture or trophy. The STATUE OF LIBERTY is the iconic monument in New York Harbor. The LIBERTY BELL is the historic symbol of American independence in Philadelphia. A BELL PEPPER is the sweet, crunchy vegetable used in cooking.",
        difficulty: 'EASY'
    },
    {
        solution: ["NICOLAS", "CAGE", "FREE", "LOVE", "PARADE", "NAKED", "SHORT", "SUPPLY", "STORE"],
        narrative: "NICOLAS CAGE is the Academy Award-winning actor known for eccentric roles. CAGE FREE describes eggs from hens not confined to cages. FREE LOVE was the 1960s movement rejecting traditional romantic restrictions. The LOVE PARADE was Berlin's legendary electronic music festival. To PARADE NAKED is to march unclothed, as Lady Godiva famously did through Coventry. A NAKED SHORT is selling shares you haven't borrowed—an illegal trading practice. SHORT SUPPLY means something is scarce or limited. A SUPPLY STORE is a shop selling materials and provisions.",
        difficulty: 'HARD'
    },
    {
        solution: ["HUSBANDING", "RESOURCES", "HUB", "CAP", "TABLE", "STAKES", "HIGH", "VOLTAGE", "SPIKE"],
        narrative: "HUSBANDING RESOURCES is the careful management and conservation of assets. A RESOURCES HUB is a central location for accessing materials and information. A HUBCAP is the decorative cover on a car's wheel. A CAP TABLE is a spreadsheet showing equity ownership in a startup. TABLE STAKES are the minimum requirements to participate. When STAKES are HIGH, the risk and reward are significant. HIGH VOLTAGE is dangerous electrical power that can cause serious harm. A VOLTAGE SPIKE is a sudden surge in electrical power that can damage equipment.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SUMPTUARY", "LAW", "MERCHANT", "BANK", "SHOT", "NOISE", "GATE", "ARRAY", "ANTENNA"],
        narrative: "A SUMPTUARY LAW was the original 'no flexing' rule—limits on fancy clothes and spending. The LAW MERCHANT was the medieval rulebook for cross-border trade, which eventually feeds into a MERCHANT BANK (finance for big deals). Then we ricochet into the literal: a BANK SHOT bounces off a cushion. In electronics, SHOT NOISE is the jitter from electrons arriving in discrete clumps; audio folks tame that with a NOISE GATE. Chip designers build logic with a GATE ARRAY, and antenna engineers scale that idea into an ARRAY ANTENNA that beams signals directionally.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["STONE", "MASON", "JAR", "HEAD", "STRONG", "HOLD", "OVER", "NIGHT", "GOWN"],
        narrative: "A STONEMASON is a craftsperson who works with stone. A MASON JAR is a glass container for preserving food. A JARHEAD is military slang for a U.S. Marine. Someone who is HEADSTRONG is stubbornly willful. A STRONGHOLD is a fortified place or a place of strength. A HOLDOVER is something remaining from a previous period. OVERNIGHT means during or throughout the night. A NIGHTGOWN is a loose garment worn for sleeping.",
        difficulty: 'EASY'
    },
    {
        solution: ["DROP", "KICK", "STAND", "OFF", "SHORE", "BIRD", "DOG", "EAR", "PLUG"],
        narrative: "A DROPKICK is a kick made by dropping the ball and kicking it as it bounces. A KICKSTAND supports a bicycle when parked. A STANDOFF is a deadlock between opposing parties. OFFSHORE refers to activities or locations away from the coast. A SHOREBIRD is a bird that lives along coastlines. A BIRD DOG is a hunting dog trained to point at game birds. A DOG-EAR is a folded corner of a page in a book. An EARPLUG is inserted into the ear canal to block sound or water.",
        difficulty: 'EASY'
    },
    {
        solution: ["SNARE", "DRUM", "ROLL", "TOP", "SOIL", "PIPE", "ORGAN", "DONOR", "CARD"],
        narrative: "A SNARE DRUM is a drum with metal wires stretched across the bottom head. A DRUM ROLL is a rapid succession of beats. A ROLL-TOP desk has a flexible wooden cover that rolls up. TOPSOIL is the uppermost layer of soil, rich in nutrients. A SOIL PIPE is a vertical pipe carrying waste from toilets. A PIPE ORGAN is a musical instrument that produces sound using pressurized air through pipes. An ORGAN DONOR agrees to donate their organs after death. A DONOR CARD indicates a person's wish to be an organ donor.",
        difficulty: 'EASY'
    },
    {
        solution: ["BRAIN", "DEAD", "LOCK", "PICK", "AXE", "GRIND", "STONE", "FRUIT", "FLY"],
        narrative: "Someone who is BRAIN DEAD has no brain activity. A DEADLOCK is a standstill where no progress can be made. A LOCKPICK is a tool for opening locks without a key. A PICKAXE is a tool with a pointed head for breaking rock. To have an AXE TO GRIND is to have a personal issue to address. A GRINDSTONE is used for sharpening tools. STONE FRUIT includes peaches, plums, and cherries. A FRUIT FLY is a small insect attracted to ripe produce.",
        difficulty: 'EASY'
    },
    {
        solution: ["BUTTER", "MILK", "MAN", "HOLE", "COVER", "STORY", "TIME", "SHARE", "HOLDER"],
        narrative: "BUTTERMILK is a tangy dairy drink used in cooking and baking. A MILKMAN delivers dairy products to homes. A MANHOLE provides access to underground utilities. A HOLE COVER protects openings in streets and sidewalks. A COVER STORY is a false account to hide the truth. STORYTIME is when children gather to hear tales read aloud. A TIMESHARE is a vacation property shared by multiple owners. A SHAREHOLDER owns stock in a company.",
        difficulty: 'EASY'
    },
    {
        solution: ["SILENT", "TREATMENT", "PLANT", "CELL", "TOWER", "BLOCK", "HEAD", "FIRST", "BASE"],
        narrative: "The SILENT TREATMENT is a form of passive-aggressive behavior where someone refuses to communicate. A TREATMENT PLANT processes water or sewage for safe disposal. A PLANT CELL is the basic structural unit of plant life, containing chloroplasts. A CELL TOWER transmits wireless communication signals. A TOWER BLOCK is a British term for a high-rise residential building. A BLOCKHEAD is slang for a foolish or stubborn person. To dive HEADFIRST is to jump in bravely without hesitation. FIRST BASE is both a baseball position and slang for early romantic progress.",
        difficulty: 'HARD'
    },
    {
        solution: ["RIVER", "DANCE", "HALL", "WAY", "LAY", "OFF", "ROAD", "SHOW", "BOAT"],
        narrative: "RIVERDANCE is the iconic Irish step-dancing theatrical show that became a global phenomenon. A DANCE HALL is a venue for social dancing. A HALLWAY is a corridor connecting rooms in a building. To WAYLAY someone is to ambush or intercept them unexpectedly. A LAYOFF is when an employer terminates workers due to economic conditions. An OFF-ROAD vehicle is designed for driving on unpaved terrain. A ROAD SHOW is a traveling presentation or tour promoting a product or idea. A SHOWBOAT is a riverboat with theatrical performances, or someone who shows off.",
        difficulty: 'HARD'
    },
    {
        solution: ["PEPPER", "CORN", "DOG", "WATCH", "TOWER", "CRANE", "FLY", "WEIGHT", "LOSS"],
        narrative: "A PEPPERCORN is the dried berry used to make black pepper. A CORN DOG is a hot dog coated in cornmeal batter and deep-fried. A DOG WATCH is a naval term for a short duty shift of two hours, traditionally from 4-6 PM or 6-8 PM. A WATCHTOWER is a tall structure used for observation and surveillance. A TOWER CRANE is the tall construction equipment used to lift heavy materials at building sites. A CRANE FLY is a long-legged flying insect often mistaken for a giant mosquito. A FLYWEIGHT is the lightest weight class in boxing, under 112 pounds. WEIGHT LOSS is the reduction of body mass through diet or exercise.",
        difficulty: 'HARD'
    },
    {
        solution: ["CLOCK", "WORK", "FORCE", "FIELD", "TEST", "PILOT", "WHALE", "TAIL", "COAT"],
        narrative: "CLOCKWORK refers to a mechanism with gears and springs, or something that operates with precision. The WORKFORCE is the total number of people employed or available for work. A FORCE FIELD is a protective energy barrier in science fiction. A FIELD TEST evaluates a product or system under real-world conditions. A TEST PILOT is an aviator who flies experimental aircraft to evaluate performance. A PILOT WHALE is a species of oceanic dolphin known for mass strandings. A WHALE TAIL is slang for when underwear shows above low-rise pants, or the actual fluke of a whale. A TAILCOAT is a formal men's coat with tails at the back, worn for white-tie events.",
        difficulty: 'HARD'
    },
    {
        solution: ["TRIGGER", "FINGER", "TIP", "TOE", "HOLD", "OUT", "BURST", "MODE", "DIAL"],
        narrative: "A TRIGGER FINGER is the index finger used to fire a weapon, or a medical condition causing finger stiffness. A FINGERTIP is the sensitive end of a finger. To TIPTOE is to walk quietly on the tips of one's toes. A TOEHOLD is a small foothold in climbing, or an initial position from which to advance. A HOLDOUT is someone who refuses to participate or accept terms. An OUTBURST is a sudden release of strong emotion or energy. BURST MODE is a camera setting that takes multiple rapid-fire photos. A MODE DIAL is the control on a camera that switches between shooting modes like manual, automatic, or portrait.",
        difficulty: 'HARD'
    },
    {
        solution: ["STAN", "TWITTER", "BLUE", "CHECK", "MARK", "CUBAN", "MISSILE", "CRISIS", "MODE"],
        narrative: "To STAN is internet slang for being an obsessive fan (from Eminem's song). STAN TWITTER refers to the communities of devoted celebrity fans on the platform. TWITTER BLUE is the paid subscription service for verification and features. A BLUE CHECK is the verified account badge. A CHECK MARK indicates completion or approval. MARK CUBAN is the billionaire entrepreneur and Shark Tank investor. The CUBAN MISSILE Crisis was the 1962 nuclear standoff between the US and USSR. A MISSILE CRISIS is a dangerous military confrontation. CRISIS MODE is operating under emergency conditions.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["EDGE", "LORD", "COMMANDER", "DATA", "BASE", "JUMP", "SCARE", "CROW", "BAR"],
        narrative: "An EDGE LORD is internet slang for someone who tries to be provocatively offensive. A LORD COMMANDER is the leader of the Night's Watch in Game of Thrones. COMMANDER DATA is the android officer from Star Trek: The Next Generation. A DATABASE stores organized digital information. BASE JUMP is the extreme sport of parachuting from fixed objects (buildings, antennas, spans, earth). A JUMP SCARE is a horror movie technique. A SCARECROW deters birds from crops. A CROWBAR is a metal prying tool.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SPEED", "RUN", "FLAT", "EARTH", "QUAKE", "LAKE", "CITY", "POP", "TART"],
        narrative: "A SPEED RUN is completing a video game as fast as possible. A RUN-FLAT tire can operate after puncture. FLAT EARTH is the debunked conspiracy theory. An EARTHQUAKE is seismic activity. QUAKE LAKE (like Montana's 1959 Earthquake Lake) forms when landslides dam rivers. A LAKE CITY is a municipality near a lake. CITY POP is the 1980s Japanese music genre experiencing revival. A POP-TART is the Kellogg's toaster pastry.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["VLOG", "SQUAD", "GOAL", "POST", "ROCK", "HARD", "CORE", "GAMER", "GATE"],
        narrative: "A VLOG SQUAD refers to David Dobrik's YouTube collaborative group. A SQUAD GOAL is internet slang for aspirational friendship. A GOAL POST is the upright structure in sports. POST-ROCK is an experimental music genre (Sigur Rós, Godspeed You! Black Emperor). ROCK HARD means extremely firm. HARDCORE describes intense music or dedicated fans. A CORE GAMER plays frequently and seriously. GAMERGATE was the controversial 2014 internet harassment campaign.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CRYPTO", "BRO", "CODE", "NAME", "DROP", "DEAD", "PAN", "FLUTE", "PLAYER"],
        narrative: "A CRYPTO BRO is slang for an overly enthusiastic cryptocurrency evangelist. The BRO CODE is the unwritten rules of male friendship (popularized by 'How I Met Your Mother'). A CODE NAME is a secret identifier. To NAME DROP is to mention famous acquaintances to impress. DROP DEAD means to die suddenly, or as slang, stunning ('drop-dead gorgeous'). DEADPAN is the expressionless comedic delivery style. A PAN FLUTE is the ancient musical instrument of bound pipes. A FLUTE PLAYER is a musician of the instrument.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["ROCKING", "HORSE", "SHOE", "STRING", "BEAN", "COUNTER", "PART", "TIME", "ZONE"],
        narrative: "A ROCKING HORSE is a children's toy horse mounted on curved rockers. A HORSESHOE is a U-shaped metal piece nailed to a horse's hoof for protection. A SHOESTRING is a thin cord for fastening shoes, also slang for a minimal budget. A STRING BEAN is a long, thin green bean. A BEAN COUNTER is slang for an accountant who obsesses over small details. A COUNTERPART is a person or thing that corresponds to another. PART-TIME means working fewer than full-time hours. A TIME ZONE is a geographical region with a uniform standard time.",
        difficulty: 'EASY'
    },
    {
        solution: ["LIME", "STONE", "WALL", "EYE", "WITNESS", "STAND", "UP", "START", "LINE"],
        narrative: "LIMESTONE is a sedimentary rock composed mainly of calcium carbonate. A STONEWALL is a wall made of stones, or to obstruct and delay as a verb. A WALLEYE is a freshwater fish with large, reflective eyes, or an eye condition. An EYEWITNESS is a person who sees an event firsthand. A WITNESS STAND is the place in a courtroom where a witness testifies. STAND-UP can mean rising to one's feet or a comedy performance. An UPSTART is an arrogant newcomer who rises suddenly to prominence. A START LINE is the line where a race begins.",
        difficulty: 'EASY'
    },
    {
        solution: ["BLUE", "BERRY", "PATCH", "CORD", "BLOOD", "TYPE", "FACE", "OFF", "SPRING"],
        narrative: "A BLUEBERRY is a small, sweet blue fruit popular in pies and muffins. A BERRY PATCH is an area where berries grow wild or are cultivated. A PATCH CORD is a short cable connecting audio or electronic equipment. CORD BLOOD is blood from the umbilical cord, rich in stem cells for medical use. A BLOOD TYPE is the classification of blood (A, B, AB, O) based on antigens. A TYPEFACE is the design style of printed letters, also called a font. A FACE-OFF is a confrontation or standoff, or the start of play in hockey. OFFSPRING refers to one's children or descendants.",
        difficulty: 'EASY'
    },
    {
        solution: ["JUNK", "MAIL", "BOX", "LUNCH", "BREAK", "WATER", "MELON", "SEED", "POD"],
        narrative: "JUNK MAIL is unwanted advertising mail that clutters your mailbox. A MAILBOX is a box for receiving mail at your home or office. A BOX LUNCH is a meal packed in a box for eating away from home. A LUNCH BREAK is a midday pause from work for eating. A BREAKWATER is a barrier built to protect a harbor from waves. A WATERMELON is a large fruit with a green rind and sweet red flesh. A MELON SEED is the seed found inside a melon. A SEED POD is a protective case containing seeds on a plant.",
        difficulty: 'EASY'
    },
    {
        solution: ["HONEY", "POT", "ROAST", "BEEF", "CAKE", "MIX", "UP", "STREAM", "BED"],
        narrative: "A HONEYPOT is a container for storing honey, or a trap in cybersecurity. A POT ROAST is a beef dish braised slowly in a covered pot. ROAST BEEF is beef cooked by roasting, often served in sandwiches. A BEEFCAKE is slang for a muscular, attractive man. A CAKE MIX is a pre-made mixture for baking cakes easily. A MIX-UP is a confusion or mistake, often involving mistaken identity. UPSTREAM means in the direction opposite to the flow of a stream. A STREAMBED is the channel bottom where a stream or river flows.",
        difficulty: 'EASY'
    },
    {
        solution: ["BOAT", "MOTOR", "PARK", "PLACE", "SETTING", "SUN", "RA", "TEMPLE", "MOUNT"],
        narrative: "A BOAT MOTOR is an engine that powers a watercraft. A MOTOR PARK is British and African English for a bus station or transport hub. PARK PLACE is the famous blue property on the Monopoly board. A PLACE SETTING is the arrangement of dishes, utensils, and glassware for one person at a dining table. The SETTING SUN is the sun as it descends below the horizon at dusk. SUN RA was the visionary avant-garde jazz musician known for cosmic philosophy and Afrofuturism. A RA TEMPLE was a sanctuary dedicated to the ancient Egyptian sun god, such as those at Heliopolis. The TEMPLE MOUNT is the sacred hilltop in Jerusalem's Old City, holy to Judaism, Christianity, and Islam.",
        difficulty: 'HARD'
    },
    {
        solution: ["SPEED", "DATING", "PROFILE", "PICTURE", "DAY", "BREAK", "FAST", "FOOD", "TRUCK"],
        narrative: "SPEED DATING is a quick-fire dating event where participants meet briefly before rotating. A DATING PROFILE is your account page on an online dating site or app. A PROFILE PICTURE is the main photo displayed on a social media or dating account. PICTURE DAY is the school day when students have their photos taken for yearbooks. DAYBREAK is the time when day begins, also known as dawn. BREAKFAST is the first meal of the day, eaten in the morning. FAST FOOD is quick-service restaurant fare designed for speed and convenience. A FOOD TRUCK is a mobile vehicle serving prepared food on the street.",
        difficulty: 'EASY'
    },
    {
        solution: ["PENNY", "WHISTLE", "BLOWER", "MOTOR", "CYCLE", "PATH", "WAY", "WARD", "ROBE"],
        narrative: "A PENNY WHISTLE is a simple six-hole woodwind instrument, also called a tin whistle. A WHISTLE BLOWER is a person who exposes illegal or unethical activities within an organization. A BLOWER MOTOR is the fan motor in a car's heating and cooling system. A MOTORCYCLE is a two-wheeled motor vehicle. A CYCLE PATH is a dedicated route for bicycles. A PATHWAY is a route or track laid down for walking. WAYWARD means difficult to control or predict, erratic in behavior. A WARDROBE is a closet for storing clothes or a person's entire collection of clothing.",
        difficulty: 'EASY'
    },
    {
        solution: ["DOLLAR", "MENU", "BOARD", "GAME", "NIGHT", "LIFE", "VEST", "POCKET", "KNIFE"],
        narrative: "A DOLLAR MENU is a fast-food menu featuring low-priced items. A MENU BOARD is the display showing food options at a restaurant. A BOARD GAME is a tabletop game like Monopoly or Scrabble. GAME NIGHT is an evening dedicated to playing games with friends or family. NIGHTLIFE refers to social activities and entertainment available after dark. A LIFE VEST is a flotation device worn for water safety. A VEST POCKET is a small pocket on a vest, or describes something compact. A POCKET KNIFE is a folding knife small enough to carry in a pocket.",
        difficulty: 'EASY'
    },
    {
        solution: ["HULA", "HOOP", "SKIRT", "STEAK", "HOUSE", "FLY", "OVER", "DRAFT", "PICK"],
        narrative: "A HULA HOOP is a toy ring spun around the waist by gyrating the hips. A HOOP SKIRT is a women's undergarment with a framework to extend the skirt outward. A SKIRT STEAK is a flavorful, thin cut of beef from the diaphragm muscles. A STEAK HOUSE is a restaurant specializing in beef steaks. A HOUSE FLY is the common fly found buzzing around homes. A FLYOVER is an aircraft flight over a location, or a bridge carrying one road over another. An OVERDRAFT is a deficit in a bank account from withdrawing more than available. A DRAFT PICK is a player selected by a team in a sports draft.",
        difficulty: 'EASY'
    },
    {
        solution: ["VIRAL", "VIDEO", "GAME", "OVER", "LOAD", "OUT", "FIT", "CHECK", "IN"],
        narrative: "A VIRAL VIDEO is content that spreads rapidly across the internet through shares and views. A VIDEO GAME is an electronic game played on a screen or console. GAME OVER signals the end of a video game session when the player loses. OVERLOAD means to burden with too much of something. A LOAD OUT is the process of packing up equipment after an event or concert. An OUTFIT is a set of clothes worn together. A FIT CHECK is Gen Z slang for showing off your outfit on social media. CHECK-IN is the process of arriving and registering at a hotel, airport, or event.",
        difficulty: 'HARD'
    },
    {
        solution: ["HATE", "WATCH", "PARTY", "CITY", "COUNCIL", "FLAT", "SCREEN", "GRAB", "BAR"],
        narrative: "To HATE WATCH is to view content you despise for entertainment or critique purposes. A WATCH PARTY is a group viewing event, popular for streaming shows or sports. PARTY CITY is the retail chain known for party supplies and costumes. A CITY COUNCIL is the elected legislative body governing a municipality. A COUNCIL FLAT is British term for a public housing apartment. A FLAT SCREEN is a thin television or computer monitor. A SCREEN GRAB is a screenshot or captured image from a display. A GRAB BAR is a safety handle mounted in bathrooms to prevent falls.",
        difficulty: 'HARD'
    },
    {
        solution: ["ECHO", "CHAMBER", "MUSIC", "SCORE", "CARD", "KEY", "STONE", "AGE", "GAP"],
        narrative: "An ECHO CHAMBER is an environment where people only encounter opinions reinforcing their own, especially on social media. CHAMBER MUSIC is classical music written for a small ensemble. A MUSIC SCORE is the written form of a musical composition. A SCORE CARD tracks points in golf or other games. A CARD KEY is a plastic key card used to unlock hotel rooms. The KEYSTONE is the central wedge-shaped stone at the top of an arch, or refers to Pennsylvania (the Keystone State). The STONE AGE is the prehistoric period when tools were made from stone. An AGE GAP is a significant difference in years between people, often in relationships.",
        difficulty: 'HARD'
    },
    {
        solution: ["CLICK", "BAIT", "FISH", "EYE", "PATCH", "CABLE", "CAR", "WASH", "BOARD"],
        narrative: "CLICK BAIT is sensationalist online content designed to attract attention and encourage clicks. A BAIT FISH is a small fish used to lure larger fish when fishing. A FISH EYE lens is a wide-angle camera lens that produces a curved, distorted image. An EYE PATCH is a covering worn over one eye, famously associated with pirates. A PATCH CABLE is a short cable used to connect audio equipment or network devices. A CABLE CAR is a vehicle suspended from and propelled by a moving cable, iconic in San Francisco. A CAR WASH is a facility for cleaning automobiles. A WASHBOARD refers to the old laundry tool or slang for well-defined abdominal muscles.",
        difficulty: 'HARD'
    },
    {
        solution: ["SPACE", "AGE", "OLD", "MONEY", "PIT", "BOSS", "LADY", "BIRD", "CAGE"],
        narrative: "The SPACE AGE refers to the era of space exploration beginning in the 1950s. AGE OLD means ancient or longstanding. OLD MONEY refers to inherited wealth from established families. A MONEY PIT is an investment that keeps draining resources, also the title of a 1986 Tom Hanks comedy. A PIT BOSS is a casino supervisor who oversees gaming tables. BOSS LADY is slang for a confident, powerful woman in charge. LADY BIRD is both a 2017 coming-of-age film by Greta Gerwig and the nickname of First Lady Claudia Johnson. A BIRD CAGE is an enclosure for keeping pet birds.",
        difficulty: 'HARD'
    },
    {
        solution: ["OCCAM", "RAZOR", "BACK", "HOE", "DOWN", "STAGE", "HAND", "BRAKE", "LIGHT"],
        narrative: "OCCAM'S RAZOR is the principle that the simplest explanation is usually correct. A RAZORBACK is a wild boar or the Arkansas mascot. A BACKHOE is excavating equipment. A HOEDOWN is a country square dance. DOWNSTAGE is the front of the stage. A STAGEHAND works behind the scenes. A HANDBRAKE is a parking brake. A BRAKE LIGHT signals when braking.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HERCULEAN", "TASK", "MASTER", "CLASS", "CLOWN", "FISH", "LADDER", "MATCH", "POINT"],
        narrative: "A HERCULEAN TASK is an extremely difficult labor. A TASKMASTER imposes strict discipline. A MASTER CLASS is an expert tutorial. The CLASS CLOWN makes jokes in school. A CLOWN FISH is the Finding Nemo species. A FISH LADDER lets salmon migrate past dams. A LADDER MATCH is a wrestling match type. MATCH POINT is the decisive tennis point.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MOLOTOV", "COCKTAIL", "DRESS", "REHEARSAL", "DINNER", "PARTY", "TRICK", "PLAY", "THING"],
        narrative: "A MOLOTOV COCKTAIL is an improvised incendiary weapon. A COCKTAIL DRESS is semi-formal evening attire. A DRESS REHEARSAL is the final practice in full costume. A REHEARSAL DINNER precedes a wedding. A DINNER PARTY is a social meal gathering. A PARTY TRICK entertains guests. A TRICK PLAY deceives the defense. A PLAYTHING is a toy.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["BANANA", "SPLIT", "SECOND", "THOUGHT", "CRIME", "SCENE", "KID", "ROCK", "STEADY"],
        narrative: "A BANANA SPLIT is an ice cream sundae. A SPLIT SECOND is a brief moment. SECOND THOUGHT is reconsideration. A THOUGHT CRIME is from Orwell's 1984. A CRIME SCENE is investigated by police. A SCENE KID was part of the 2000s emo subculture. KID ROCK is an American rock musician. ROCK STEADY is a Jamaican music genre.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CROCODILE", "TEAR", "GAS", "PUMP", "IRON", "FIST", "BUMP", "STOCK", "YARD"],
        narrative: "CROCODILE TEARS are fake displays of emotion. TEAR GAS is used for riot control. A GAS PUMP dispenses fuel. To PUMP IRON is to lift weights. An IRON FIST means authoritarian rule. A FIST BUMP is a greeting gesture. A BUMP STOCK is a firearm accessory. A STOCKYARD holds livestock before sale.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FAUSTIAN", "BARGAIN", "HUNTER", "MOON", "WALK", "OFF", "SEASON", "PASS", "PORT"],
        narrative: "A FAUSTIAN BARGAIN is a deal with the devil for short-term gain. A BARGAIN HUNTER seeks discounts and deals. A HUNTER MOON is the full moon following the harvest moon in October. A MOONWALK is both a lunar stroll and Michael Jackson's signature dance. A WALK-OFF is a game-ending hit in baseball. The OFF SEASON is when a sport isn't being played. A SEASON PASS grants unlimited access. A PASSPORT is travel identification.",
        difficulty: 'HARD'
    },
    {
        solution: ["DUTCH", "UNCLE", "SAM", "ADAMS", "APPLE", "SAUCE", "BOAT", "LOAD", "STONE"],
        narrative: "A DUTCH UNCLE gives blunt, honest advice. UNCLE SAM is the personification of the U.S. government. SAM ADAMS is both a founding father and a beer brand. An ADAM'S APPLE is the laryngeal prominence in the throat. APPLESAUCE is a pureed fruit side dish. A SAUCEBOAT is a serving dish for gravy. A BOATLOAD is a large quantity. A LOADSTONE is a naturally magnetized mineral that attracts iron.",
        difficulty: 'HARD'
    },
    {
        solution: ["SACRED", "COW", "TIPPING", "POINT", "SPREAD", "EAGLE", "EYE", "BALL", "BUSTER"],
        narrative: "A SACRED COW is an untouchable idea or institution. COW TIPPING is the rural prank of pushing over sleeping cows. A TIPPING POINT is the critical threshold where change becomes unstoppable. A POINT SPREAD is the betting margin in sports gambling. SPREAD EAGLE means limbs extended outward. An EAGLE EYE has exceptionally sharp vision. An EYEBALL is the spherical organ of sight. A BALLBUSTER is someone who is tough or demanding.",
        difficulty: 'EASY'
    },
    {
        solution: ["HAIL", "MARY", "JANE", "DOE", "SKIN", "DEEP", "STATE", "CRAFT", "BEER"],
        narrative: "A HAIL MARY is a desperate last-second football pass. MARY JANE is slang for marijuana (or Spider-Man's love interest). JANE DOE is the legal placeholder name for an unidentified woman. DOESKIN is soft leather made from deer hide. SKIN DEEP means superficial. The DEEP STATE is a conspiracy theory about shadow government. STATECRAFT is the art of diplomacy and government. CRAFT BEER is artisanal beer from small breweries.",
        difficulty: 'EASY'
    },
    {
        solution: ["SMOKING", "GUN", "BOAT", "NECK", "BRACE", "LET", "GO", "CART", "WHEEL"],
        narrative: "A SMOKING GUN is irrefutable evidence of wrongdoing. A GUNBOAT is a small armed naval vessel. A BOATNECK is a wide neckline that follows the collarbone. A NECKBRACE is a cervical collar worn after injury. A BRACELET is jewelry worn around the wrist. To LET GO is to release or dismiss. A GO-CART is a small racing vehicle. A CARTWHEEL is a sideways acrobatic rotation.",
        difficulty: 'EASY'
    },
    {
        solution: ["PETRI", "DISH", "WATER", "SHED", "ROW", "HOUSE", "BROKEN", "FIELD", "TRIP"],
        narrative: "A PETRI DISH is a shallow container for culturing microorganisms. DISH WATER is the water used for washing dishes. A WATERSHED is a critical turning point or a drainage basin. A SHED ROW is the stable area at a racetrack. A ROW HOUSE is a connected urban dwelling sharing walls. HOUSEBROKEN means trained not to urinate indoors. BROKEN FIELD is a football running style with unpredictable direction changes. A FIELD TRIP is an educational excursion outside the classroom.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["POISON", "PEN", "STROKE", "PLAY", "BOOK", "END", "TABLE", "SALT", "SHAKER"],
        narrative: "A POISON PEN letter is an anonymous, malicious written attack. A PEN STROKE is a single mark made when writing. STROKE PLAY is a golf scoring format counting total strokes. A PLAYBOOK contains strategies and plays for a team. A BOOKEND holds books upright on a shelf. An END TABLE is small furniture beside a sofa or bed. TABLE SALT is common sodium chloride for seasoning food. A SALT SHAKER dispenses salt through holes in its top.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DARK", "HORSE", "TRADE", "WIND", "FALL", "GUY", "LINER", "LOCK", "BOX"],
        narrative: "A DARK HORSE is an unexpected competitor or unknown candidate. To HORSE TRADE is to negotiate shrewdly with give-and-take. TRADE WINDS are tropical winds blowing toward the equator. A WINDFALL is unexpected good fortune or money. A FALL GUY is a scapegoat who takes blame for others. GUYLINER is slang for eyeliner worn by men. A LINER LOCK is a knife mechanism that locks the blade open. A LOCKBOX is a secure container for valuables or keys.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MAIDEN", "NAME", "SAKE", "BOMB", "THREAT", "LEVEL", "SET", "BACK", "DROP"],
        narrative: "A MAIDEN NAME is a woman's surname before marriage. A NAMESAKE shares the same name as someone else. A SAKE BOMB is a drinking game dropping sake into beer. A BOMB THREAT is a warning of an explosive device. A THREAT LEVEL indicates the degree of danger. To LEVEL SET is to align expectations in business. A SETBACK is a reversal or obstacle to progress. A BACKDROP is scenery behind a stage or the background context.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GRAVEYARD", "SHIFT", "DRESS", "CODE", "BREAKER", "BAR", "BELL", "TOWER", "DEFENSE"],
        narrative: "The GRAVEYARD SHIFT is the overnight work shift. A SHIFT DRESS is a loose, straight-cut women's garment. A DRESS CODE specifies acceptable attire for a venue. A CODEBREAKER deciphers encrypted messages. A BREAKER BAR is a long-handled tool for loosening bolts. A BARBELL is weightlifting equipment with weights on both ends. A BELL TOWER is a structure housing bells, often in churches. TOWER DEFENSE is a video game genre about defending against waves of enemies.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["ACORN", "SQUASH", "COURT", "ROOM", "MATE", "DATE", "NIGHT", "OWL", "HOOT"],
        narrative: "ACORN SQUASH is a winter vegetable. SQUASH COURT is where you play squash. A COURTROOM is where trials are held. A ROOMMATE shares your living space. A MATE DATE is casual slang for a hookup. DATE NIGHT is a romantic evening. A NIGHT OWL stays up late. An OWL HOOT is the bird's distinctive call.",
        difficulty: 'EASY'
    },
    {
        solution: ["SALMON", "RUN", "FLAT", "TIRE", "IRON", "MAN", "MADE", "UP", "TURN"],
        narrative: "A SALMON RUN is when fish swim upstream to spawn. RUN FLAT tires can drive without air. A FLAT TIRE needs to be changed. A TIRE IRON helps change tires. IRON MAN is a triathlon or superhero. MAN-MADE means artificial. MADE UP can mean invented or wearing makeup. An UP TURN is an improvement.",
        difficulty: 'EASY'
    },
    {
        solution: ["PUMPKIN", "PATCH", "WORK", "BENCH", "PRESS", "BOX", "TOP", "COAT", "HANGER"],
        narrative: "A PUMPKIN PATCH grows autumn squash. PATCHWORK is a quilt style with fabric pieces. A WORKBENCH is for crafts and repairs. A BENCH PRESS is a weightlifting exercise. A PRESS BOX is for sports journalists. BOX TOP labels can be collected. A TOPCOAT is an outer garment. A COAT HANGER holds clothing.",
        difficulty: 'EASY'
    },
    {
        solution: ["PICNIC", "BASKET", "WEAVE", "POLE", "CAT", "FISH", "BONE", "YARD", "SALE"],
        narrative: "A PICNIC BASKET holds food for outdoor meals. BASKET WEAVE is an interlaced pattern. A WEAVE POLE is used in dog agility. A POLECAT is a small carnivorous mammal. A CATFISH lurks in murky waters. A FISHBONE can get stuck in your throat. A BONEYARD is a graveyard or junkyard. A YARD SALE sells used household items.",
        difficulty: 'EASY'
    },
    {
        solution: ["GRAPEFRUIT", "JUICE", "BOX", "CUTTER", "ANT", "FARM", "LAND", "LORD", "SHIP"],
        narrative: "GRAPEFRUIT JUICE is a tangy breakfast drink. A JUICE BOX is a portable drink container. A BOX CUTTER is a sharp utility knife. A CUTTER ANT slices leaves. An ANT FARM is a glass habitat for observing ants. FARMLAND is agricultural territory. A LANDLORD owns rental property. LORDSHIP is a title of nobility.",
        difficulty: 'EASY'
    },
    {
        solution: ["FOREST", "RANGER", "RICK", "ROLL", "CALL", "WAITING", "ROOM", "TEMP", "JOB"],
        narrative: "A FOREST RANGER protects wilderness areas. RANGER RICK is a children's nature magazine. To RICK-ROLL someone is to prank them with the famous song. A ROLL CALL checks attendance. CALL WAITING alerts you to another caller. A WAITING ROOM is where you sit before appointments. ROOM TEMP is ambient temperature. A TEMP JOB is temporary employment.",
        difficulty: 'EASY'
    },
    {
        solution: ["JUNGLE", "GYM", "RAT", "PACK", "MULE", "DEER", "TICK", "BITE", "SIZE"],
        narrative: "A JUNGLE GYM is a climbing structure for kids. A GYM RAT spends lots of time exercising. A RAT PACK is a group of friends (or the famous entertainers). A PACK MULE carries heavy loads. MULE DEER have distinctive large ears. A DEER TICK can transmit Lyme disease. A TICK BITE leaves a mark. BITE-SIZE means small enough for one mouthful.",
        difficulty: 'EASY'
    },
    {
        solution: ["WAFFLE", "IRON", "CLAD", "ARMOR", "PLATE", "GLASS", "CEILING", "FAN", "BASE"],
        narrative: "A WAFFLE IRON makes breakfast treats. IRONCLAD means impenetrable or guaranteed. CLAD ARMOR is protective covering. ARMOR PLATE is thick protective metal. PLATE GLASS is flat, polished glass. A GLASS CEILING is an invisible barrier to advancement. A CEILING FAN circulates air. A FAN BASE is a group of supporters.",
        difficulty: 'EASY'
    },
    {
        solution: ["TICKLE", "PINK", "SLIP", "STREAM", "LINE", "MAN", "DATE", "PALM", "TREE"],
        narrative: "TICKLED PINK means very pleased. A PINK SLIP is a layoff notice. A SLIPSTREAM is the area behind a moving vehicle. To STREAMLINE is to make more efficient. A LINEMAN works on power lines or plays football. A MAN DATE is a social outing between male friends. A DATE PALM is a tree that produces dates. A PALM TREE is a tropical icon.",
        difficulty: 'EASY'
    },
    {
        solution: ["BLACKBERRY", "PIE", "CRUST", "PUNK", "ROCK", "STAR", "DUST", "BUNNY", "HOP"],
        narrative: "BLACKBERRY PIE is a sweet summer dessert. A PIE CRUST is the pastry shell. CRUST PUNK is a subgenre of punk rock. PUNK ROCK is a music genre. A ROCK STAR is a famous musician. STARDUST is cosmic debris or magical particles. A DUST BUNNY is a ball of fluff under furniture. The BUNNY HOP is a playful dance.",
        difficulty: 'EASY'
    },
    {
        solution: ["SAUSAGE", "LINK", "UP", "SHOT", "CLOCK", "TOWER", "BRIDGE", "WORK", "MAN"],
        narrative: "A SAUSAGE LINK is one connected piece. A LINK-UP is a connection or meeting. The UP SHOT is the final result. A SHOT CLOCK limits time in basketball. A CLOCK TOWER is a tall structure with a timepiece. TOWER BRIDGE is famous in London. BRIDGE WORK is dental repair. A WORKMAN is a laborer.",
        difficulty: 'EASY'
    },
    {
        solution: ["PANCAKE", "STACK", "YARD", "ARM", "LOCK", "OUT", "LINE", "AGE", "SPOT"],
        narrative: "A PANCAKE STACK is a pile of breakfast treats. A STACK YARD is where hay bales are stored. A YARDARM is a horizontal beam on a ship's mast. An ARM LOCK is a wrestling hold. A LOCKOUT prevents workers from entering. An OUTLINE is a summary or border. LINEAGE is your ancestry. An AGE SPOT is a skin blemish.",
        difficulty: 'EASY'
    },
    {
        solution: ["RASPBERRY", "JAM", "BAND", "AID", "WORKER", "BEE", "KEEPER", "GOAL", "POST"],
        narrative: "RASPBERRY JAM is a sweet spread. A JAM BAND plays extended improvisations. BAND-AID is a bandage brand. An AID WORKER provides humanitarian help. A WORKER BEE toils for the hive. A BEEKEEPER tends hives. A GOALKEEPER defends the net. A GOALPOST is what you aim for in sports.",
        difficulty: 'EASY'
    },
    {
        solution: ["VOLCANO", "ASH", "TRAY", "TABLE", "LAND", "MARK", "DOWN", "FALL", "BACK"],
        narrative: "VOLCANIC ASH is ejected during eruptions. An ASHTRAY holds cigarette remains. A TRAY TABLE folds down on planes. TABLELAND is a flat elevated area. A LANDMARK is a notable location. A MARKDOWN is a price reduction. A DOWNFALL is a sudden decline. A FALLBACK is a backup option.",
        difficulty: 'EASY'
    },
    {
        solution: ["CHIPMUNK", "CHEEK", "BONE", "HEAD", "BAND", "WIDTH", "WISE", "CRACK", "DOWN"],
        narrative: "A CHIPMUNK stores food in its CHEEKS. A CHEEKBONE is the facial bone under your eye. A BONEHEAD makes foolish mistakes. A HEADBAND is worn around the forehead. BANDWIDTH is data transfer capacity. WIDTHWISE means across the width. A WISECRACK is a clever joke. A CRACKDOWN is strict enforcement.",
        difficulty: 'EASY'
    },
    {
        solution: ["SARDINE", "CAN", "DO", "OVER", "LOOK", "OUT", "DOOR", "BELL", "BOY"],
        narrative: "SARDINES are packed in a CAN. A CAN-DO attitude is positive and willing. A DO-OVER is a second chance. To OVERLOOK is to miss something or have a view. A LOOKOUT watches for danger. OUTDOOR means outside. A DOORBELL announces visitors. A BELLBOY carries luggage at hotels.",
        difficulty: 'EASY'
    },
    {
        solution: ["HERRING", "BONE", "CHINA", "DOLL", "HOUSE", "PROUD", "LION", "HEART", "BEAT"],
        narrative: "HERRINGBONE is a zigzag pattern. BONE CHINA is fine porcelain. A CHINA DOLL is a delicate figurine. A DOLLHOUSE is a miniature home. HOUSE PROUD means taking pride in your home. A PROUD LION is the king of the jungle. LIONHEART means courageous. A HEARTBEAT is your pulse.",
        difficulty: 'EASY'
    },
    {
        solution: ["PEACOCK", "FEATHER", "DUSTER", "COAT", "CHECK", "MARK", "TIME", "CLOCK", "WISE"],
        narrative: "A PEACOCK FEATHER has an iridescent eye. A FEATHER DUSTER cleans surfaces. A DUSTER COAT is a long light coat. A COAT CHECK holds outerwear. A CHECKMARK indicates completion. To MARK TIME is to wait in place. A TIME CLOCK tracks work hours. CLOCKWISE is the standard rotation direction.",
        difficulty: 'EASY'
    },
    {
        solution: ["COPPER", "HEAD", "STRONG", "ARM", "CHAIR", "MAN", "HUNT", "DOWN", "TOWN"],
        narrative: "A COPPERHEAD is a venomous snake. HEADSTRONG means stubborn. A STRONGARM uses force. An ARMCHAIR is a comfortable seat. A CHAIRMAN leads a meeting. A MANHUNT searches for a fugitive. To HUNT DOWN is to pursue relentlessly. DOWNTOWN is the city center.",
        difficulty: 'EASY'
    },
    {
        solution: ["LOBSTER", "CLAW", "HAMMER", "HEAD", "DRESS", "SHIRT", "TAIL", "END", "ZONE"],
        narrative: "A LOBSTER CLAW is a pincer. A CLAW HAMMER has a curved end for pulling nails. A HAMMERHEAD is a type of shark. A HEADDRESS is ceremonial headwear. A DRESS SHIRT is formal attire. A SHIRTTAIL hangs below the waist. The TAIL END is the final part. An END ZONE is where touchdowns are scored.",
        difficulty: 'EASY'
    },
    {
        solution: ["WILD", "CARD", "SHARP", "SHOOTER", "MARBLE", "CAKE", "WALK", "THROUGH", "PUT"],
        narrative: "A WILDCARD is an unpredictable element. A CARD SHARP is a skilled card player. A SHARPSHOOTER is an expert marksman. A SHOOTER MARBLE is the larger marble used in games. MARBLE CAKE has a swirled pattern. A CAKEWALK is something easy. A WALKTHROUGH is an instructional guide. THROUGHPUT measures system capacity.",
        difficulty: 'EASY'
    },
    {
        solution: ["MASTER", "MIND", "BLOWN", "GLASS", "CEILING", "FAN", "CLUB", "SANDWICH", "BOARD"],
        narrative: "A criminal genius is a MASTERMIND. To be amazed is to have your MIND BLOWN. An artisan creates BLOWN GLASS. A GLASS CEILING is an invisible barrier to advancement. A CEILING FAN cools a room. Enthusiasts form a FAN CLUB. A CLUB SANDWICH has three slices of bread. A SANDWICH BOARD is a type of sign worn on the body.",
        difficulty: 'EASY'
    },
    {
        solution: ["SPRING", "BOARD", "WALK", "AWAY", "TEAM", "PLAYER", "PIANO", "BAR", "TENDER"],
        narrative: "A SPRINGBOARD is used in diving. A BOARDWALK is a wooden path along a beach. To WALK AWAY is to leave. An AWAY TEAM plays at another venue. A TEAM PLAYER works well with others. A PLAYER PIANO plays itself. A PIANO BAR features live music. A BARTENDER serves drinks.",
        difficulty: 'EASY'
    },
    {
        solution: ["WITNESS", "STAND", "UP", "GRADE", "SCHOOL", "YARD", "STICK", "FIGURE", "EIGHT"],
        narrative: "A WITNESS STAND is where testimony is given. STAND-UP comedy is performed while standing. To UPGRADE is to improve. A GRADE SCHOOL educates children. A SCHOOLYARD is where kids play. A YARDSTICK measures three feet. A STICK FIGURE is a simple drawing. A FIGURE EIGHT is a shape or skating pattern.",
        difficulty: 'EASY'
    },
    {
        solution: ["QUARTER", "BACK", "FLIP", "FLOP", "HOUSE", "KEEPING", "SCORE", "KEEPER", "RING"],
        narrative: "A QUARTERBACK leads the offense in football. A BACKFLIP is an acrobatic move. A FLIP-FLOP is a sandal or a policy reversal. A FLOPHOUSE is cheap lodging. HOUSEKEEPING cleans rooms. KEEPING SCORE tracks points in a game. A SCOREKEEPER records the results. A KEEPER RING holds things in place.",
        difficulty: 'EASY'
    },
    {
        solution: ["FAST", "TRACK", "SUIT", "CASE", "STUDY", "HALL", "PASS", "PORT", "WINE"],
        narrative: "A FAST TRACK speeds up progress. A TRACKSUIT is athletic wear. A SUITCASE holds clothes for travel. A CASE STUDY is an in-depth analysis. A STUDY HALL is supervised time for homework. A HALL PASS allows students to leave class. A PASSPORT enables international travel. PORT WINE is a sweet fortified wine.",
        difficulty: 'EASY'
    },
    {
        solution: ["LIGHT", "HOUSE", "HOLD", "OUT", "LAW", "SUIT", "ABLE", "SEAMAN", "SHIP"],
        narrative: "A LIGHTHOUSE guides ships safely. A HOUSEHOLD is a domestic unit. To HOLD OUT is to resist or endure. An OUTLAW is a criminal. A LAWSUIT is a legal action. A SUITABLE choice is appropriate. An ABLE SEAMAN is a skilled sailor. SEAMANSHIP is nautical skill.",
        difficulty: 'EASY'
    },
    {
        solution: ["POCKET", "WATCH", "TOWER", "BRIDGE", "WORK", "FORCE", "FIELD", "GOAL", "POST"],
        narrative: "A POCKET WATCH is a portable timepiece. A WATCHTOWER provides surveillance. TOWER BRIDGE is a famous London landmark. BRIDGEWORK is dental prosthetics. A WORKFORCE is employed people. A FORCE FIELD is a protective barrier. In football, a FIELD GOAL scores three points. A GOALPOST marks the scoring area.",
        difficulty: 'EASY'
    },
    {
        solution: ["ROYAL", "FLUSH", "TOILET", "PAPER", "TIGER", "SHARK", "BAIT", "SWITCH", "BLADE"],
        narrative: "A ROYAL FLUSH is the best poker hand. To FLUSH a TOILET removes waste. TOILET PAPER is essential bathroom tissue. A PAPER TIGER appears threatening but is ineffectual. A TIGER SHARK is a dangerous predator. SHARK BAIT is vulnerable prey. A BAIT AND SWITCH is a deceptive sales tactic. A SWITCHBLADE is a folding knife.",
        difficulty: 'EASY'
    },
    {
        solution: ["COMMON", "GROUND", "ZERO", "TOLERANCE", "LEVEL", "HEAD", "COUNT", "DOWN", "LOAD"],
        narrative: "COMMON GROUND is shared understanding. GROUND ZERO is the epicenter. ZERO TOLERANCE is a strict policy. A TOLERANCE LEVEL is the acceptable limit. A LEVEL HEAD stays calm. A HEADCOUNT tallies people present. A COUNTDOWN precedes an event. To DOWNLOAD is to transfer data.",
        difficulty: 'EASY'
    },
    {
        solution: ["CRYSTAL", "BALL", "PARK", "BENCH", "MARK", "DOWN", "TURN", "OVER", "NIGHT"],
        narrative: "A CRYSTAL BALL predicts the future. BALLPARK figures are rough estimates. A PARK BENCH offers outdoor seating. A BENCHMARK is a standard for comparison. To MARK DOWN is to reduce price. A DOWNTURN is an economic decline. To TURN OVER is to flip or transfer. OVERNIGHT means happening in one night.",
        difficulty: 'EASY'
    },
    {
        solution: ["FIRE", "DRILL", "SERGEANT", "PEPPER", "SPRAY", "TAN", "LINE", "DANCE", "FLOOR"],
        narrative: "A FIRE DRILL practices evacuation. A DRILL SERGEANT trains military recruits. SERGEANT PEPPER is a famous Beatles album. PEPPER SPRAY is for self-defense. A SPRAY TAN adds color artificially. A TAN LINE shows sun exposure. LINE DANCING is choreographed. A DANCE FLOOR is where people dance.",
        difficulty: 'EASY'
    },
    {
        solution: ["SHADOW", "BOXING", "RING", "LEADER", "BOARD", "CERTIFIED", "PUBLIC", "DOMAIN", "NAME"],
        narrative: "SHADOW BOXING is practice fighting without an opponent. A BOXING RING is where fights take place. A RINGLEADER organizes a group. A LEADERBOARD shows rankings. BOARD CERTIFIED means professionally qualified. A CERTIFIED PUBLIC accountant handles finances. PUBLIC DOMAIN means freely available. A DOMAIN NAME identifies a website.",
        difficulty: 'EASY'
    },
    {
        solution: ["UNDER", "WORLD", "RECORD", "BREAKING", "NEWS", "FLASH", "FLOOD", "GATE", "KEEPER"],
        narrative: "The UNDERWORLD is the criminal realm or realm of the dead. A WORLD RECORD is the best global achievement. RECORD BREAKING surpasses previous bests. BREAKING NEWS is urgent reporting. A NEWS FLASH is a sudden announcement. A FLASH FLOOD happens rapidly. A FLOODGATE controls water flow. A GATEKEEPER controls access.",
        difficulty: 'EASY'
    },
    {
        solution: ["THUNDER", "STRUCK", "GOLD", "DIGGER", "WASP", "NEST", "EGG", "SHELL", "SHOCKED"],
        narrative: "THUNDERSTRUCK means amazed or the AC/DC song. To have STRUCK GOLD is to find fortune. A GOLD DIGGER seeks wealthy partners. A DIGGER WASP is a burrowing insect. A WASP NEST houses the colony. A NEST EGG is savings for the future. An EGGSHELL is fragile. SHELL-SHOCKED means traumatized.",
        difficulty: 'EASY'
    },
    {
        solution: ["STAIR", "WELL", "SPRING", "CHICKEN", "SCRATCH", "PAD", "LOCK", "JAW", "BREAKER"],
        narrative: "A STAIRWELL is an enclosed staircase. A WELLSPRING is a source of something. A SPRING CHICKEN is a young person. CHICKEN SCRATCH is illegible handwriting. A SCRATCH PAD is for quick notes. A PADLOCK secures things. LOCKJAW is tetanus. A JAWBREAKER is a hard candy.",
        difficulty: 'EASY'
    },
    {
        solution: ["BITTER", "SWEET", "HEART", "LAND", "SLIDE", "SHOW", "ROOM", "MATE", "SHIP"],
        narrative: "BITTERSWEET is both pleasant and painful. A SWEETHEART is a loved one. The HEARTLAND is the central region. A LANDSLIDE is an overwhelming victory or earth movement. A SLIDESHOW is a presentation. A SHOWROOM displays products. A ROOMMATE shares living space. MATESHIP is the Australian concept of friendship and loyalty.",
        difficulty: 'EASY'
    },
    {
        solution: ["BLOOD", "HOUND", "DOG", "FIGHT", "CLUB", "FOOT", "PRINT", "SCREEN", "PLAY"],
        narrative: "A BLOODHOUND tracks scents. A HOUND DOG is a hunting breed. A DOGFIGHT is aerial combat. FIGHT CLUB is the famous film. A CLUBFOOT is a birth defect. A FOOTPRINT is a mark left behind. To PRINT SCREEN captures your display. A SCREENPLAY is a movie script.",
        difficulty: 'EASY'
    },
    {
        solution: ["SMOOTH", "TALK", "SHOW", "CASE", "LOAD", "BEARING", "ARMS", "RACE", "TRACK"],
        narrative: "To SMOOTH TALK is to persuade with charm. A TALK SHOW features interviews. A SHOWCASE displays items. A CASELOAD is work volume. LOAD-BEARING walls support structure. BEARING ARMS means carrying weapons. An ARMS RACE is military competition. A RACETRACK hosts competitions.",
        difficulty: 'EASY'
    },
    {
        solution: ["BREAKING", "POINT", "BLANK", "CHECK", "LIST", "PRICE", "TAG", "LINE", "BACKER"],
        narrative: "A BREAKING POINT is when someone snaps. POINT BLANK is close range. A BLANK CHECK gives unlimited authority. A CHECKLIST helps track tasks. A LIST PRICE is the retail cost. A PRICE TAG shows the cost. A TAGLINE is a memorable slogan. A LINEBACKER is a football position.",
        difficulty: 'EASY'
    },
    {
        solution: ["DOUBLE", "DUTCH", "OVEN", "MITT", "ROMNEY", "MARSH", "MALLOW", "CUP", "CAKE"],
        narrative: "DOUBLE DUTCH is a jump rope game. A DUTCH OVEN is a heavy cooking pot. An OVEN MITT protects hands from heat. MITT ROMNEY is a U.S. politician. ROMNEY MARSH is a wetland in England. A MARSHMALLOW is a soft candy. A MALLOW CUP is a chocolate candy. A CUPCAKE is a small individual cake.",
        difficulty: 'EASY'
    },
    {
        solution: ["DEAD", "POOL", "PARTY", "ANIMAL", "HOUSE", "MUSIC", "VIDEO", "GAME", "OVER"],
        narrative: "DEADPOOL is the Marvel antihero. A POOL PARTY is a summer gathering. A PARTY ANIMAL loves to celebrate. ANIMAL HOUSE is the classic comedy film. HOUSE MUSIC is an electronic dance genre. A MUSIC VIDEO accompanies a song. A VIDEO GAME is interactive entertainment. GAME OVER means you've lost.",
        difficulty: 'HARD'
    },
    {
        solution: ["SLAP", "STICK", "FIGURE", "HEAD", "STRONG", "ARM", "CHAIR", "LIFT", "OFF"],
        narrative: "SLAPSTICK is physical comedy. A STICK FIGURE is a simple drawing. A FIGUREHEAD is a symbolic leader. HEADSTRONG means stubborn. To STRONGARM is to use force. An ARMCHAIR is for relaxing. A CHAIRLIFT takes skiers uphill. LIFTOFF is a rocket launch.",
        difficulty: 'HARD'
    },
    {
        solution: ["GHOST", "WRITER", "BLOCK", "CHAIN", "GANG", "BUSTER", "SWORD", "FISH", "FRY"],
        narrative: "A GHOSTWRITER writes for others without credit. WRITER'S BLOCK is creative paralysis. BLOCKCHAIN is cryptocurrency technology. A CHAIN GANG is prisoners working together. GANGBUSTERS means with great success. The BUSTER SWORD is Cloud's weapon in Final Fantasy. A SWORDFISH is a large billfish. A FISH FRY is a Southern cooking tradition.",
        difficulty: 'HARD'
    },
    {
        solution: ["SLAM", "POETRY", "READING", "RAINBOW", "BRIDGE", "TROLL", "DOLL", "HOUSE", "HUSBAND"],
        narrative: "SLAM POETRY is competitive spoken word. A POETRY READING is a literary event. READING RAINBOW was LeVar Burton's educational show. RAINBOW BRIDGE is where pets go in the afterlife. A BRIDGE TROLL demands payment to cross. A TROLL DOLL has wild colorful hair. A DOLLHOUSE is a miniature home. A HOUSE HUSBAND manages the household.",
        difficulty: 'HARD'
    },
    {
        solution: ["HAPPY", "HOUR", "GLASS", "JAW", "BONE", "HEAD", "HUNTER", "KILLER", "WHALE"],
        narrative: "HAPPY HOUR offers discounted drinks. An HOURGLASS measures time with sand. A GLASS JAW means easily knocked out. The JAWBONE is part of the skull. A BONEHEAD makes stupid mistakes. A HEADHUNTER recruits executives. HUNTER KILLER is a type of submarine or the film. A KILLER WHALE is an orca.",
        difficulty: 'HARD'
    },
    {
        solution: ["BUZZ", "KILL", "JOY", "RIDE", "SHARE", "WARE", "HOUSE", "ARREST", "WARRANT"],
        narrative: "A BUZZKILL ruins the fun. A KILLJOY spoils others' enjoyment. A JOYRIDE is an unauthorized spin in a vehicle. RIDESHARE services include Uber and Lyft. SHAREWARE is try-before-you-buy software. A WAREHOUSE stores goods. HOUSE ARREST confines someone to their home. An ARREST WARRANT authorizes detention.",
        difficulty: 'HARD'
    },
    {
        solution: ["LEFT", "FIELD", "DAY", "DREAM", "BOAT", "HOUSE", "CAT", "WALK", "OVER"],
        narrative: "Something unexpected comes from LEFT FIELD. A FIELD DAY is a fun outdoor event. A DAYDREAM is a waking fantasy. A DREAMBOAT is an attractive person. A BOATHOUSE stores watercraft. A HOUSE CAT is a domestic feline. A CATWALK is a fashion runway. A WALKOVER is an easy victory.",
        difficulty: 'HARD'
    },
    {
        solution: ["SKULL", "CAP", "GUN", "SHOT", "CLOCK", "TOWER", "DEFENSE", "ATTORNEY", "GENERAL"],
        narrative: "A SKULLCAP is a close-fitting hat. A CAP GUN is a toy firearm. A GUNSHOT is a bullet discharge. A SHOT CLOCK limits play time in basketball. A CLOCK TOWER displays time publicly. TOWER DEFENSE is a video game genre. A DEFENSE ATTORNEY represents the accused. The ATTORNEY GENERAL is the top legal official.",
        difficulty: 'HARD'
    },
    {
        solution: ["HATE", "CRIME", "SCENE", "KID", "ROCK", "BOTTOM", "LINE", "DANCE", "OFF"],
        narrative: "A HATE CRIME targets protected groups. A CRIME SCENE is investigated by police. A SCENE KID embraces emo/alternative fashion. KID ROCK is the American rock musician. ROCK BOTTOM is the lowest point. The BOTTOM LINE is the final result. LINE DANCING is choreographed country dancing. A DANCE-OFF is a competition.",
        difficulty: 'HARD'
    },
    {
        solution: ["MEAN", "GIRL", "POWER", "TRIP", "WIRE", "TAP", "DANCE", "BATTLE", "SHIP"],
        narrative: "A MEAN GIRL is a bully from the iconic film. GIRL POWER celebrates female empowerment. A POWER TRIP is an ego-driven abuse of authority. A TRIPWIRE triggers alarms or explosives. A WIRETAP intercepts communications. TAP DANCE uses metal-soled shoes. A DANCE BATTLE is a competitive showdown. BATTLESHIP is the naval strategy game.",
        difficulty: 'HARD'
    },
    {
        solution: ["CASH", "COW", "GIRL", "BOSS", "MAN", "CAVE", "PAINTING", "CLASS", "ACTION"],
        narrative: "A CASH COW generates steady profits. A COWGIRL rides horses in the West. A GIRL BOSS is a female entrepreneur. The BOSSMAN is in charge. A MAN CAVE is a male retreat. CAVE PAINTINGS are prehistoric art. A PAINTING CLASS teaches art. A CLASS ACTION is a group lawsuit.",
        difficulty: 'HARD'
    },
    {
        solution: ["SIDE", "CHICK", "FLICK", "KNIFE", "FIGHT", "CLUB", "FOOT", "NOTE", "BOOK"],
        narrative: "A SIDE CHICK is slang for a secret girlfriend. A CHICK FLICK is a romantic movie. A FLICK KNIFE is British for switchblade. A KNIFE FIGHT is a blade combat. FIGHT CLUB is the Fincher film. A CLUBFOOT is a congenital condition. A FOOTNOTE is supplementary text. A NOTEBOOK is for writing.",
        difficulty: 'HARD'
    },
    {
        solution: ["DEAD", "BEAT", "BOX", "SET", "PIECE", "WORK", "SHOP", "LIFT", "OFF"],
        narrative: "A DEADBEAT avoids responsibilities. To BEATBOX is to make music vocally. A BOX SET is a collection of media. A SET PIECE is a planned play in sports. PIECEWORK pays by output. A WORKSHOP is a hands-on session. To SHOPLIFT is to steal merchandise. LIFTOFF is a rocket launch.",
        difficulty: 'HARD'
    },
    {
        solution: ["DUMB", "BELL", "BOY", "TOY", "STORY", "TIME", "WARP", "SPEED", "BUMP"],
        narrative: "A DUMBBELL is a weight for exercise. A BELLBOY carries luggage at hotels. A BOY TOY is a young male companion. TOY STORY is the Pixar franchise. STORYTIME is when tales are read. A TIME WARP distorts the timeline. WARP SPEED is faster than light. A SPEED BUMP slows traffic.",
        difficulty: 'HARD'
    },
    {
        solution: ["COUCH", "POTATO", "HEAD", "STONE", "WALL", "FLOWER", "POWER", "HOUR", "GLASS"],
        narrative: "A COUCH POTATO is a lazy person. MR. POTATO HEAD is the classic toy. A HEADSTONE marks a grave. To STONEWALL is to obstruct. A WALLFLOWER is a shy person at parties. FLOWER POWER was a 60s slogan. A POWER HOUR is intense drinking. An HOURGLASS measures time with sand.",
        difficulty: 'HARD'
    },
    {
        solution: ["STONE", "COLD", "CASE", "FILE", "CABINET", "MAKER", "SPACE", "JAM", "SESSION"],
        narrative: "STONE COLD Steve Austin is a WWE legend. A COLD CASE is an unsolved crime. A CASE FILE contains investigation documents. A FILE CABINET stores documents. A CABINET MAKER builds furniture. A MAKERSPACE is for DIY projects. SPACE JAM is the Michael Jordan film. A JAM SESSION is improvisational music.",
        difficulty: 'HARD'
    },
    {
        solution: ["BURN", "OUT", "BACK", "PACK", "RAT", "RACE", "CAR", "JACK", "POT"],
        narrative: "BURNOUT is exhaustion from overwork. The OUTBACK is Australian wilderness. A BACKPACK carries belongings. A PACK RAT hoards items. The RAT RACE is the daily grind. A RACE CAR competes at high speeds. To CARJACK is to steal a vehicle. The JACKPOT is the big prize.",
        difficulty: 'HARD'
    },
    {
        solution: ["PLAY", "GROUND", "BREAKING", "BAD", "ASS", "HAT", "TRICK", "SHOT", "GUN"],
        narrative: "A PLAYGROUND is where kids play. GROUNDBREAKING is revolutionary. BREAKING BAD is the acclaimed TV series. A BADASS is impressively tough. An ASSHAT is slang for a jerk. A HAT TRICK is three goals in one game. A TRICK SHOT requires skill. A SHOTGUN is a firearm.",
        difficulty: 'HARD'
    },
    {
        solution: ["SWEAT", "PANTS", "SUIT", "CASE", "LOAD", "BEARING", "ARMS", "RACE", "TRACK"],
        narrative: "SWEATPANTS are comfortable loungewear. A PANTSUIT is professional attire. A SUITCASE holds travel belongings. A CASELOAD is work volume. LOAD-BEARING supports weight. BEARING ARMS is the right to carry weapons. An ARMS RACE is military competition. A RACETRACK hosts competitions.",
        difficulty: 'HARD'
    },
    {
        solution: ["AIR", "STRIKE", "ZONE", "OUT", "RAGE", "QUIT", "SMOKING", "GUN", "BOAT"],
        narrative: "An AIR STRIKE is a military bombing. The STRIKE ZONE is where pitches must cross. To ZONE OUT is to lose focus. OUTRAGE is intense anger. To RAGE QUIT is to angrily leave a game. QUIT SMOKING is a health goal. A SMOKING GUN is undeniable evidence. A GUNBOAT is a small armed vessel.",
        difficulty: 'HARD'
    },
    {
        solution: ["SPILL", "TEA", "PARTY", "ANIMAL", "CRACKER", "BARREL", "CHEST", "BUMP", "MAP"],
        narrative: "To SPILL TEA is to share gossip. A TEA PARTY is a political movement or social gathering. A PARTY ANIMAL loves to celebrate. An ANIMAL CRACKER is an animal-shaped snack. CRACKER BARREL is a restaurant chain. A BARREL CHEST is a rounded torso. A CHEST BUMP is a celebratory gesture. A BUMP MAP adds texture in 3D graphics.",
        difficulty: 'HARD'
    },
    {
        solution: ["TIGER", "KING", "PIN", "DROP", "KICK", "ASS", "BACKWARDS", "HAT", "BOX"],
        narrative: "TIGER KING is the viral Netflix documentary. A KINGPIN is a crime boss. You could hear a PIN DROP in silence. A DROP KICK is a rugby or wrestling move. To KICK ASS is to dominate. ASS BACKWARDS means doing things wrong. A BACKWARDS HAT is worn with the brim behind. A HATBOX stores headwear.",
        difficulty: 'HARD'
    },
    {
        solution: ["STINK", "EYE", "CANDY", "CANE", "TOAD", "STOOL", "PIGEON", "HOLE", "PUNCH"],
        narrative: "To give the STINK EYE is to glare disapprovingly. EYE CANDY is visually pleasing. A CANDY CANE is a holiday treat. A CANE TOAD is an invasive amphibian. A TOADSTOOL is a poisonous mushroom. A STOOL PIGEON is an informant. To PIGEONHOLE is to categorize narrowly. A HOLE PUNCH makes paper holes.",
        difficulty: 'HARD'
    },
    {
        solution: ["FLEX", "TAPE", "DELAY", "PEDAL", "STEEL", "GUITAR", "HERO", "WORSHIP", "SERVICE"],
        narrative: "FLEX TAPE is the infomercial adhesive. A TAPE DELAY is an audio effect. A DELAY PEDAL modifies guitar sound. PEDAL STEEL is a type of guitar. A STEEL GUITAR produces country twang. GUITAR HERO is the old rock-star video game. HERO WORSHIP is excessive admiration. A WORSHIP SERVICE is a religious gathering.",
        difficulty: 'HARD'
    },
    {
        solution: ["MAMA", "BEAR", "MARKET", "VALUE", "MEAL", "DEAL", "BREAKER", "BOX", "OFFICE"],
        narrative: "A MAMA BEAR is a protective mother. A BEAR MARKET has declining prices. MARKET VALUE is fair price. A VALUE MEAL is a fast food combo. A MEAL DEAL is a discounted food offer. A DEAL BREAKER ruins negotiations. A BREAKER BOX controls electrical circuits. The BOX OFFICE sells tickets.",
        difficulty: 'HARD'
    },
    {
        solution: ["SIDE", "HUSTLE", "FLOW", "STATE", "TROOPER", "HAT", "BOX", "OFFICE", "SPACE"],
        narrative: "A SIDE HUSTLE is secondary income. HUSTLE & FLOW is the Oscar-winning film. A FLOW STATE is peak mental performance. A STATE TROOPER patrols highways. A TROOPER HAT is the wide-brimmed campaign cover. A HATBOX stores headwear. The BOX OFFICE sells tickets. OFFICE SPACE is the cult workplace comedy.",
        difficulty: 'HARD'
    },
    {
        solution: ["VIBE", "CHECK", "MARK", "UP", "CHARGE", "CARD", "BOARD", "GAME", "OVER"],
        narrative: "A VIBE CHECK assesses the mood. A CHECK MARK indicates completion. A MARKUP increases prices. An UPCHARGE is an extra fee. A CHARGE CARD is for purchases. CARDBOARD is packaging material. A BOARD GAME provides entertainment. GAME OVER ends play.",
        difficulty: 'HARD'
    },
    {
        solution: ["SAFE", "WORD", "VOMIT", "COMET", "TAIL", "SPIN", "DOCTOR", "WHO", "CARES"],
        narrative: "A SAFE WORD stops BDSM activity. WORD VOMIT is uncontrollable speech from Mean Girls. The VOMIT COMET simulates zero gravity. A COMET TAIL trails behind. A TAILSPIN is an uncontrolled descent. A SPIN DOCTOR manipulates public perception. DOCTOR WHO is the BBC sci-fi series. WHO CARES expresses indifference.",
        difficulty: 'HARD'
    },
    {
        solution: ["FEAR", "FACTOR", "IN", "LAW", "FIRM", "HAND", "SHAKE", "WEIGHT", "LIFTING"],
        narrative: "FEAR FACTOR was the extreme game show. To FACTOR IN is to include. An IN-LAW is a spouse's relative. A LAW FIRM employs attorneys. A FIRM HAND shows discipline. A HANDSHAKE seals agreements. A SHAKE WEIGHT is the fitness gimmick. WEIGHTLIFTING builds muscle.",
        difficulty: 'HARD'
    },
    {
        solution: ["DEEP", "FAKE", "NEWS", "ANCHOR", "MAN", "CAVE", "IN", "CROWD", "FUNDING"],
        narrative: "A DEEPFAKE uses AI to create fake media. FAKE NEWS is misinformation. A NEWS ANCHOR reports stories. ANCHORMAN is the Will Ferrell comedy. A MAN CAVE is a male retreat. To CAVE IN is to collapse or yield. The IN CROWD is the popular group. CROWDFUNDING raises money online.",
        difficulty: 'HARD'
    },
    {
        solution: ["DUCK", "FACE", "PLANT", "FOOD", "STAMP", "DUTY", "FREE", "AGENT", "ORANGE"],
        narrative: "A DUCK FACE is a selfie pout. To FACE PLANT is to fall forward. PLANT FOOD is fertilizer. FOOD STAMPS assist low-income families. STAMP DUTY is a property tax. DUTY FREE means no import taxes. A FREE AGENT signs with any team. AGENT ORANGE was a toxic herbicide.",
        difficulty: 'HARD'
    },
    {
        solution: ["LAME", "DUCK", "TAPE", "WORM", "HOLE", "PUNCH", "DRUNK", "DIAL", "TONE"],
        narrative: "A LAME DUCK is an outgoing politician. DUCK TAPE is adhesive tape. A TAPEWORM is a parasite. A WORMHOLE is a space-time tunnel. A HOLE PUNCH makes paper holes. PUNCH DRUNK means dazed from blows. To DRUNK DIAL is to call while intoxicated. A DIAL TONE signals an open line.",
        difficulty: 'HARD'
    },
    {
        solution: ["TALK", "DIRTY", "DANCING", "QUEEN", "BEE", "LINE", "UP", "CHUCK", "NORRIS"],
        narrative: "To TALK DIRTY is to speak sexually. DIRTY DANCING is the Swayze film. DANCING QUEEN is the ABBA hit. A QUEEN BEE leads the hive. To make a BEELINE is to go directly. A LINEUP is a police identification. To UPCHUCK is to vomit. CHUCK NORRIS is the martial arts legend.",
        difficulty: 'HARD'
    },
    {
        solution: ["STAGE", "DIVING", "BOARD", "MEMBER", "SHIP", "YARD", "ARM", "PIT", "CREW"],
        narrative: "STAGE DIVING leaps into a crowd. A DIVING BOARD launches swimmers. A BOARD MEMBER governs an organization. MEMBERSHIP grants access. A SHIPYARD builds vessels. A YARD ARM is a sail support. An ARMPIT is a body cavity. A PIT CREW services race cars.",
        difficulty: 'HARD'
    },
    {
        solution: ["HYPE", "TRAIN", "STATION", "MASTER", "CLASS", "ACTION", "MOVIE", "STAR", "STRUCK"],
        narrative: "The HYPE TRAIN builds excitement. A TRAIN STATION is a transit hub. A STATION MASTER manages rail operations. A MASTER CLASS teaches expertise. A CLASS ACTION is a group lawsuit. An ACTION MOVIE features stunts. A MOVIE STAR is a celebrity. STAR STRUCK means awestruck by fame.",
        difficulty: 'HARD'
    },
    {
        solution: ["SHADE", "TREE", "LINE", "DANCE", "BATTLE", "ROYAL", "FLUSH", "MOUNT", "EVEREST"],
        narrative: "A SHADE TREE provides cover. A TREE LINE marks where trees stop growing. A LINE DANCE is synchronized group dancing. A DANCE BATTLE is a competitive showdown. BATTLE ROYALE is a last-person-standing fight. A ROYAL FLUSH is the best poker hand. A FLUSH MOUNT is a ceiling light style. MOUNT EVEREST is Earth's tallest peak.",
        difficulty: 'HARD'
    },
    {
        solution: ["COAT", "CHECK", "POINT", "BLANK", "SLATE", "ROOF", "DECK", "HAND", "STAND"],
        narrative: "A COAT CHECK stores outerwear. A CHECKPOINT verifies passage. POINT BLANK is at close range. A BLANK SLATE is a fresh start. A SLATE ROOF uses stone tiles. A ROOF DECK is an outdoor platform. A DECKHAND works on a ship. A HANDSTAND is a gymnastic pose.",
        difficulty: 'HARD'
    },
    {
        solution: ["PETTY", "CASH", "COW", "BELL", "PEPPER", "MILL", "STREAM", "BED", "ROOM"],
        narrative: "PETTY CASH is small funds for expenses. A CASH COW generates steady profit. A COWBELL is a percussion instrument. A BELL PEPPER is a vegetable. A PEPPER MILL grinds spices. A MILLSTREAM powers water wheels. A STREAMBED is the channel floor. A BEDROOM is for sleeping.",
        difficulty: 'HARD'
    },
    {
        solution: ["DOOM", "SCROLL", "LOCK", "JAW", "DROP", "DEAD", "WEIGHT", "LOSS", "LEADER"],
        narrative: "To DOOMSCROLL is to obsessively read bad news. SCROLL LOCK is a keyboard key. LOCKJAW is tetanus. A JAW DROP expresses shock. DROP DEAD means to die suddenly. DEADWEIGHT is useless burden. WEIGHT LOSS is slimming. A LOSS LEADER is a discounted product to attract customers.",
        difficulty: 'HARD'
    },
    {
        solution: ["SUPER", "BOWL", "CUT", "THROAT", "PUNCH", "DRUNK", "TEXT", "BOOK", "SMART"],
        narrative: "The SUPER BOWL is football's championship. A BOWL CUT is a rounded haircut. CUTTHROAT means ruthlessly competitive. A THROAT PUNCH is a violent strike. PUNCH DRUNK is dazed from blows. A DRUNK TEXT is sent while intoxicated. A TEXTBOOK is for studying. BOOK SMART means academically intelligent.",
        difficulty: 'HARD'
    },
    {
        solution: ["VELVET", "ROPE", "SWING", "VOTER", "REGISTRATION", "DRIVE", "SHAFT", "MINE", "FIELD"],
        narrative: "A VELVET ROPE marks VIP areas at exclusive venues. A ROPE SWING hangs from trees for recreational swinging. A SWING VOTER is an undecided voter who could vote for any party. VOTER REGISTRATION is the process of signing up eligible citizens to vote. A REGISTRATION DRIVE is an organized effort to register voters. A DRIVE SHAFT transmits torque in vehicles. A SHAFT MINE is an underground mine accessed via vertical shafts. A MINEFIELD is an area with explosive mines, or figuratively a dangerous situation.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PHANTOM", "THREAD", "COUNT", "DOWN", "DRAFT", "HORSE", "COLLAR", "BONE", "DRY"],
        narrative: "PHANTOM THREAD is the 2017 Paul Thomas Anderson film about a 1950s fashion designer. THREAD COUNT measures fabric quality in sheets. A COUNTDOWN is the sequential counting before an event. A DOWNDRAFT is a meteorological phenomenon where air moves downward. A DRAFT HORSE is a large breed bred for heavy labor like Clydesdales. A HORSE COLLAR is harness equipment that fits around a draft animal's neck. The COLLARBONE (clavicle) connects the shoulder to the sternum. BONE DRY means completely without moisture.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["COMPASS", "ROSE", "WATER", "BOARDING", "SCHOOL", "SPIRIT", "WEEK", "NIGHT", "SHIFT"],
        narrative: "A COMPASS ROSE is the circular diagram on maps showing cardinal directions. ROSE WATER is a fragrant liquid used in Middle Eastern cuisine and perfumery. WATERBOARDING is an enhanced interrogation technique simulating drowning. A BOARDING SCHOOL is a residential educational institution. SCHOOL SPIRIT is enthusiasm and pride for one's educational institution. SPIRIT WEEK is an American school tradition with themed dress-up days. A WEEK NIGHT is any evening from Monday through Thursday. The NIGHT SHIFT is the overnight work period, typically 11pm-7am.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MERCURY", "POISONING", "WELL", "SPRING", "LOADED", "QUESTION", "PERIOD", "PIECE", "MEAL"],
        narrative: "MERCURY POISONING occurs from exposure to toxic mercury compounds, historically from hat-making (mad hatter). POISONING THE WELL is a logical fallacy of preemptively discrediting an opponent. A WELLSPRING is a source of water or figuratively of ideas. SPRING LOADED means tensioned by a spring mechanism. A LOADED QUESTION contains a hidden assumption. A QUESTION PERIOD is the parliamentary session where ministers answer questions. A PERIOD PIECE is a work set in a specific historical era. PIECEMEAL means done gradually in stages.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["STERLING", "SILVER", "SCREEN", "TEST", "PATTERN", "RECOGNITION", "SCENE", "STEALING", "THUNDER"],
        narrative: "STERLING SILVER is an alloy of 92.5% silver used in jewelry. The SILVER SCREEN is a metonym for cinema from early reflective movie screens. A SCREEN TEST evaluates an actor's on-camera presence for a role. A TEST PATTERN was the calibration image broadcast when TV stations went off-air. PATTERN RECOGNITION is the cognitive ability to identify regularities in data. A RECOGNITION SCENE (anagnorisis) is a dramatic moment of sudden realization. SCENE STEALING describes a performer who draws attention from the lead. STEALING THUNDER means preemptively announcing someone else's news.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["COBALT", "BLUE", "BLOOD", "ORANGE", "COUNTY", "FAIR", "WEATHER", "BALLOON", "PAYMENT"],
        narrative: "COBALT BLUE is a vivid blue pigment made from cobalt salts. BLUE BLOOD refers to aristocratic lineage (veins appear blue through pale skin). BLOOD ORANGE is a citrus variety with crimson flesh due to anthocyanins. ORANGE COUNTY exists in California, Florida, and New York. A COUNTY FAIR is a regional agricultural exhibition with rides and livestock. FAIR WEATHER describes clear skies or a friend who disappears during hardship. A WEATHER BALLOON collects atmospheric data at high altitudes. A BALLOON PAYMENT is a large final payment on a loan after smaller installments.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["NITROGEN", "FIXING", "MATCH", "POINT", "BREAK", "WATER", "BIRTH", "MARK", "ZUCKERBERG"],
        narrative: "NITROGEN FIXING is the biological process converting atmospheric N2 to usable ammonia. FIXING A MATCH is the criminal manipulation of a sporting event's outcome. MATCH POINT is the decisive moment when one player can win in tennis. POINT BREAK is the 1991 Kathryn Bigelow film about surfer bank robbers. BREAK WATER is when a pregnant woman's water breaks, labor begins. A WATER BIRTH delivers a baby in a pool. A BIRTHMARK is a congenital skin blemish. MARK ZUCKERBERG is the co-founder and CEO of Meta (Facebook).",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CINNAMON", "BROWN", "BETTY", "WHITE", "ELEPHANT", "GUN", "SMOKE", "SCREEN", "SAVER"],
        narrative: "CINNAMON BROWN is a warm reddish-brown color named after the spice. A BROWN BETTY is a classic American baked apple dessert. BETTY WHITE was the beloved actress known for 'The Golden Girls' and 'The Mary Tyler Moore Show.' A WHITE ELEPHANT is a costly possession that's more trouble than it's worth, or the gift exchange game. An ELEPHANT GUN is a large-caliber rifle designed for hunting big game. GUNSMOKE was the long-running Western TV series (1955-1975), or the smoke from a firearm. A SMOKE SCREEN is a cloud of smoke to obscure vision, or a ruse to hide true intentions. A SCREEN SAVER is computer animation that prevents screen burn-in on displays.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FRENCH", "PRESS", "GANG", "LAND", "SLIDE", "RULE", "BRITANNIA", "METAL", "DETECTOR"],
        narrative: "A FRENCH PRESS is a coffee brewing device using a plunger and mesh filter. A PRESS GANG historically forced men into naval service. GANGLAND refers to the territory and activities of organized crime. A LANDSLIDE is a geological mass movement or an overwhelming electoral victory. A SLIDE RULE is the pre-calculator analog computing device for multiplication. RULE BRITANNIA is the British patriotic song celebrating naval power. BRITANNIA METAL is a pewter-like alloy of tin, antimony, and copper. A METAL DETECTOR finds buried metallic objects using electromagnetic induction.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DEVIL'S", "ADVOCATE", "GENERAL", "ASSEMBLY", "LINE", "ITEM", "VETO", "POWER", "BROKER"],
        narrative: "A DEVIL'S ADVOCATE argues an opposing position for the sake of debate. An ADVOCATE GENERAL is a senior law officer advising the government. A GENERAL ASSEMBLY is the main deliberative body of the UN or a legislature. An ASSEMBLY LINE is the manufacturing process where products move through stations. A LINE ITEM is a single entry in a budget or list. A LINE-ITEM VETO allows executives to reject specific provisions. VETO POWER is the authority to unilaterally block legislation. A POWER BROKER is a person who wields influence behind the scenes.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["VENETIAN", "BLIND", "SIDE", "SWIPE", "RIGHT", "HAND", "OVER", "HEAD", "SHOT"],
        narrative: "A VENETIAN BLIND is a window covering with adjustable horizontal slats invented in Venice. To BLIND SIDE someone is to attack from an unexpected angle or the 2009 Sandra Bullock film. A SIDESWIPE is a glancing collision where vehicles scrape against each other. SWIPE RIGHT is the Tinder gesture indicating romantic interest in a potential match. A RIGHT HAND is the dominant appendage for most people or a trusted assistant. HAND OVER means to transfer possession or surrender something. OVERHEAD refers to ongoing business expenses or something positioned above. A HEADSHOT is a close-up photograph for actors or a lethal shot in video games.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["ESCROW", "ACCOUNT", "BALANCE", "TRANSFER", "STUDENT", "BODY", "ARMOR", "BEARER", "BOND"],
        narrative: "An ESCROW ACCOUNT holds funds during real estate transactions until closing conditions are met. An ACCOUNT BALANCE is the total amount of money in a financial account. A BALANCE TRANSFER moves credit card debt to a new card, often with lower interest. A TRANSFER STUDENT moves from one educational institution to another mid-program. A STUDENT BODY is the entire enrolled population of a school. BODY ARMOR is protective gear worn by military and law enforcement. An ARMOR BEARER was a biblical/medieval attendant who carried a warrior's weapons. A BEARER BOND is a negotiable financial instrument owned by whoever holds the physical certificate.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MITOSIS", "PHASE", "ANGLE", "GRINDER", "PUMP", "ACTION", "HERO", "COMPLEX", "NUMBER"],
        narrative: "MITOSIS PHASE refers to the stages of cell division (prophase, metaphase, anaphase, telophase). PHASE ANGLE is the difference in phase between voltage and current in AC circuits. An ANGLE GRINDER is a handheld power tool for cutting and polishing metal. A GRINDER PUMP is a sewage system component that macerates waste before pumping. PUMP ACTION is the manual loading mechanism on shotguns. An ACTION HERO is the protagonist archetype in blockbuster films like Die Hard. A HERO COMPLEX is the psychological need to rescue others to feel validated. A COMPLEX NUMBER combines a real part and imaginary part (a + bi) in mathematics.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["KEYNOTE", "SPEAKER", "PHONE", "BANK", "ACCOUNT", "EXECUTIVE", "PRODUCER", "GAS", "LIGHT"],
        narrative: "A KEYNOTE SPEAKER delivers the main address at conferences and events. A SPEAKERPHONE allows hands-free telephone communication. A PHONE BANK is a coordinated group making calls for political campaigns. A BANK ACCOUNT stores funds at a financial institution. An ACCOUNT EXECUTIVE manages client relationships in advertising and sales. An EXECUTIVE PRODUCER oversees film/TV production and secures financing. PRODUCER GAS is a fuel gas made by passing air over heated coal or biomass. A GAS LIGHT was pre-electric illumination using burning gas, now associated with psychological manipulation (gaslighting).",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TECTONIC", "SHIFT", "CIPHER", "TEXT", "MINING", "CLAIM", "JUMPER", "CABLE", "NEWS"],
        narrative: "A TECTONIC SHIFT describes massive change in Earth's crust or metaphorically in society. A SHIFT CIPHER (Caesar cipher) replaces each letter with one a fixed number of positions away. CIPHERTEXT is the encrypted output of a cryptographic algorithm. TEXT MINING is the NLP process of extracting insights from unstructured text data. A MINING CLAIM is the legal right to extract minerals from a specific plot of land. A CLAIM JUMPER illegally seizes another prospector's mining rights—or the American restaurant chain. JUMPER CABLES connect batteries to jump-start vehicles. CABLE NEWS refers to 24-hour television news channels like CNN and Fox News.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["ORBITAL", "VELOCITY", "VECTOR", "GRAPHICS", "CARD", "COUNTING", "CALORIES", "DEFICIT", "SPENDING"],
        narrative: "ORBITAL VELOCITY is the speed required for an object to maintain stable orbit around a celestial body. A VELOCITY VECTOR describes both the speed and direction of motion in physics. VECTOR GRAPHICS use mathematical paths rather than pixels for infinitely scalable images. A GRAPHICS CARD (GPU) renders visual output in computers. CARD COUNTING is the blackjack advantage play technique of tracking dealt cards. COUNTING CALORIES is the dietary practice of monitoring energy intake for weight management. A CALORIE DEFICIT occurs when energy expenditure exceeds intake, causing weight loss. DEFICIT SPENDING is the fiscal policy of government expenditure exceeding revenue.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["HARMONIC", "SERIES", "FINALE", "COUNTDOWN", "TIMER", "RELAY", "RACE", "CONDITION", "REPORT"],
        narrative: "A HARMONIC SERIES is the infinite sum 1 + 1/2 + 1/3 + ... which diverges in mathematics, or the overtone sequence in music. A SERIES FINALE is the conclusive episode of a television program. The FINAL COUNTDOWN is Europe's iconic 1986 synth-rock anthem. A COUNTDOWN TIMER displays remaining time until an event. A TIMER RELAY is an electronic component that switches circuits after a set delay. A RELAY RACE is the track event where team members pass a baton. A RACE CONDITION is a software bug where system behavior depends on unpredictable timing of concurrent processes. A CONDITION REPORT documents the state of artwork or collectibles for insurance and sale.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["LAPLACE", "TRANSFORM", "BOUNDARY", "DISPUTE", "RESOLUTION", "CENTER", "FIELDER", "CHOICE", "PARALYSIS"],
        narrative: "The LAPLACE TRANSFORM converts differential equations to algebraic ones in mathematics. A TRANSFORM BOUNDARY is where tectonic plates slide horizontally past each other. A BOUNDARY DISPUTE is a legal conflict over territorial demarcation between nations or properties. DISPUTE RESOLUTION encompasses mediation, arbitration, and other ADR methods. A RESOLUTION CENTER is the optical point of maximum focus sharpness, or a customer service facility. A CENTER FIELDER plays the defensive position between left and right field in baseball. FIELDER'S CHOICE is the ruling when a fielder retires a baserunner instead of the batter. CHOICE PARALYSIS (paradox of choice) is the psychological phenomenon where too many options inhibit decision-making.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PECKING", "ORDER", "FLOW", "CYTOMETRY", "CORE", "SAMPLE", "PLATTER", "PRESENTATION", "SKILLS"],
        narrative: "PECKING ORDER is the social hierarchy observed in poultry and metaphorically in organizations. ORDER FLOW is the stream of buy/sell orders analyzed by traders for market direction. FLOW CYTOMETRY is the laser-based laboratory technique for analyzing cell populations. A CYTOMETRY CORE is the shared university facility providing flow cytometry services. A CORE SAMPLE is the cylindrical section extracted for geological or ice analysis. A SAMPLE PLATTER offers a variety of appetizers for tasting—or a collection of audio samples for music production. PLATTER PRESENTATION refers to the artistic arrangement of food for visual appeal. PRESENTATION SKILLS are the professional competencies for effective public speaking.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["NOISE", "FLOOR", "ROUTINE", "MAINTENANCE", "SCHEDULE", "DRUG", "DEALER", "NETWORK", "EFFECT"],
        narrative: "The NOISE FLOOR is the baseline electronic interference in audio recording. A FLOOR ROUTINE is a gymnast's choreographed performance on the mat. ROUTINE MAINTENANCE is the regular upkeep of equipment or systems. A MAINTENANCE SCHEDULE is the timetable for service intervals. A SCHEDULE DRUG is a controlled substance classified by potential for abuse. A DRUG DEALER is someone who illegally sells controlled substances. A DEALER NETWORK is a distribution system of authorized sellers. The NETWORK EFFECT is the economic phenomenon where a product gains value as more people use it.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["INDIE", "SLEAZE", "ROCK", "OPERA", "GHOST", "PROTOCOL", "DROID", "ARMY", "SURPLUS"],
        narrative: "INDIE SLEAZE was the 2000s NYC party scene documented by Cobrasnake. SLEAZE ROCK is the flashy glam metal subgenre of the 1980s. ROCK OPERA is a theatrical album format like The Who's Tommy or Pink Floyd's The Wall. OPERA GHOST is the Phantom from Gaston Leroux's novel. GHOST PROTOCOL is the 2011 Mission: Impossible film starring Tom Cruise. A PROTOCOL DROID is the Star Wars robot type like C-3PO. A DROID ARMY refers to the Separatist battle droids in the Clone Wars. ARMY SURPLUS stores sell military equipment to civilians.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["STAN", "ACCOUNT", "TAKEOVER", "BID", "WHIST", "DRIVE", "THRU", "HIKER", "TRASH"],
        narrative: "A STAN ACCOUNT is a social media profile dedicated to obsessive fandom. An ACCOUNT TAKEOVER is a cybersecurity breach where hackers steal login credentials. A TAKEOVER BID is a corporate acquisition offer. BID WHIST is the African-American trick-taking card game popular since the early 1900s. A WHIST DRIVE is a social card game tournament. A DRIVE-THRU is the fast-food lane for ordering from your car. A THRU-HIKER completes an entire long-distance trail like the Appalachian Trail. HIKER TRASH is the affectionate term thru-hikers use for their disheveled trail appearance.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SIMP", "ARMY", "RESERVE", "DEPUTY", "MAYOR", "PETE", "SAMPRAS", "SERVE", "RETURN"],
        narrative: "A SIMP ARMY is the internet term for a creator's devoted (often mocked) fanbase. An ARMY RESERVE is the part-time military force that supplements active duty. A RESERVE DEPUTY is a volunteer law enforcement officer. A DEPUTY MAYOR is the second-in-command of a city government. MAYOR PETE is the nickname for Pete Buttigieg, former South Bend mayor and U.S. Secretary of Transportation. PETE SAMPRAS is the 14-time Grand Slam tennis champion of the 1990s. A SAMPRAS SERVE was his legendary weapon that won him seven Wimbledon titles. A SERVE-AND-RETURN is the tennis rally pattern of serving and returning the ball.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PARASOCIAL", "BOND", "YIELD", "CURVE", "FLATTENING", "AGENT", "ORANGE", "PEEL", "SESSION"],
        narrative: "A PARASOCIAL BOND is the one-sided emotional attachment fans form with media figures. A BOND YIELD is the return an investor earns on a debt security. A YIELD CURVE graphs interest rates across different bond maturities. CURVE FLATTENING occurs when short and long-term rates converge, often signaling recession. A FLATTENING AGENT is a paint additive that reduces gloss. AGENT ORANGE is the herbicide/defoliant notoriously used during the Vietnam War. ORANGE PEEL is the dimpled texture in paint or drywall, named for citrus skin. A PEEL SESSION was a live radio recording for BBC DJ John Peel, who championed alternative music from 1967-2004.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["GRASS", "FED", "SMOKER", "VOICE", "ACTOR", "NETWORK", "ATTACHED", "STORAGE", "LOCKER"],
        narrative: "GRASS-FED describes cattle raised on pasture rather than grain. A FED SMOKER is slang for someone who provides information to federal agents (fed + informant smoker). SMOKER VOICE is the raspy vocal quality associated with longtime smokers. A VOICE ACTOR performs dialogue for animation, video games, and dubbing. An ACTOR NETWORK is the sociological theory (ANT) that treats objects as participants in social networks. NETWORK ATTACHED STORAGE (NAS) is a dedicated file storage device on a local network. A STORAGE LOCKER is a rented unit for keeping possessions.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["TERMINALLY", "ONLINE", "HARM", "REDUCTION", "PRINT", "SPOOLER", "ALERT", "FATIGUE", "CRACK"],
        narrative: "TERMINALLY ONLINE describes someone so internet-addicted they're disconnected from reality. ONLINE HARM refers to digital abuse, harassment, and exploitation. HARM REDUCTION is the public health approach of minimizing drug use risks without requiring abstinence. REDUCTION PRINT is a printmaking technique where layers are carved from a single block. A PRINT SPOOLER is the system service that manages printer jobs in an operating system. SPOOLER ALERT is a Windows notification about print queue issues. ALERT FATIGUE is the phenomenon where excessive warnings cause people to ignore them. FATIGUE CRACK is a fracture that develops from repeated stress cycles in materials science.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["REPLY", "GUY", "FIERI", "FLAVORTOWN", "USA", "TODAY", "YEARS", "AGO", "GO"],
        narrative: "A REPLY GUY is a Twitter term for men who compulsively respond to women's posts. GUY FIERI is the spiky-haired Food Network celebrity chef. FIERI'S FLAVORTOWN is his signature catchphrase and imaginary culinary destination. FLAVORTOWN USA is the branding around Guy Fieri's restaurant empire. USA TODAY is the national American newspaper known for colorful infographics. TODAY YEARS OLD is the internet phrase for learning something obvious late ('I was today years old when...'). YEARS AGO is a time reference. AGO-GO refers to retro-futuristic aesthetic or the a-go-go dance style of the 1960s.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CONTENT", "FARM", "SHARE", "CROPPER", "SACK", "RACE", "REALISM", "TATTOO", "PARLOR"],
        narrative: "A CONTENT FARM is a website that produces low-quality articles to maximize search traffic. FARM SHARE is a CSA subscription for seasonal produce from local farms. A SHARECROPPER was a tenant farmer who gave a portion of crops as rent, common in post-Civil War American South. A CROPPER SACK was the burlap bag used by cotton pickers. A SACK RACE is the party game where participants hop in burlap bags. RACE REALISM is the pseudoscientific belief in biological racial hierarchies. REALISM TATTOO is the style of tattooing that creates photorealistic images. A TATTOO PARLOR is the establishment where tattoos are applied.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["YEET", "CANNON", "FODDER", "CROP", "TOP", "BLOKE", "CORE", "MEMORY", "PALACE"],
        narrative: "The YEET CANNON G1 is a Hi-Point pistol named after the meme-winning entry in their 2019 online naming contest. CANNON FODDER refers to soldiers viewed as expendable in military operations. FODDER CROP is agricultural vegetation grown specifically for animal feed. CROP TOP is the midriff-baring shirt style. A TOP BLOKE is British/Australian slang for a great guy. BLOKE CORE is the TikTok aesthetic of traditional masculine hobbies. CORE MEMORY is the emotional moment that becomes fundamental to identity (from Pixar's Inside Out). A MEMORY PALACE is the mnemonic technique of mentally placing items in an imagined building to improve recall.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["QUIET", "QUITTING", "TIME", "THIEF", "KNOT", "GARDEN", "LEAVE", "BEHIND", "SCENES"],
        narrative: "QUIET QUITTING is the 2022 workplace trend of doing only the minimum job requirements. QUITTING TIME is the end of the workday. A TIME THIEF is someone or something that wastes your time unproductively. A THIEF KNOT resembles a reef knot but was used by sailors to detect if someone tampered with their belongings. A KNOT GARDEN is the formal garden style with intricately patterned low hedges. GARDEN LEAVE is paid time off during a notice period where the employee stays home. LEAVE BEHIND refers to materials or items left after a meeting or presentation. BEHIND THE SCENES describes what happens out of public view.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SITUATIONSHIP", "ERA", "DEFINING", "MOMENT", "ARM", "CANDY", "GRAM", "POSITIVE", "REINFORCEMENT"],
        narrative: "A SITUATIONSHIP is a romantic relationship without clear labels or commitment. SITUATIONSHIP ERA is the Taylor Swift-influenced way of describing one's current dating phase. ERA-DEFINING describes something that characterizes an entire period. A DEFINING MOMENT is a pivotal event that shapes outcomes. A MOMENT ARM is the physics term for perpendicular distance from a force's line of action to a pivot point. ARM CANDY is an attractive partner displayed as a status accessory. A CANDY GRAM is the school tradition of sending treats with messages to classmates. GRAM-POSITIVE describes bacteria that retain crystal violet dye in the Gram staining procedure. POSITIVE REINFORCEMENT is the behavioral psychology technique of rewarding desired actions.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["PARASOCIAL", "INTERACTION", "DESIGN", "DEBT", "JUBILEE", "YEAR", "ZERO", "GRAVITY", "BONG"],
        narrative: "A PARASOCIAL INTERACTION is the one-sided relationship viewers form with media personalities. INTERACTION DESIGN is the UX discipline of designing digital product behavior. DESIGN DEBT is accumulated shortcuts in visual/UX work that must be repaid later. A DEBT JUBILEE is mass debt forgiveness, rooted in biblical tradition. A JUBILEE YEAR is the biblical 50-year cycle when debts were cancelled and slaves freed. YEAR ZERO is a starting point for new eras (Khmer Rouge policy, or the Nine Inch Nails album). ZERO GRAVITY describes the weightless condition in space. A GRAVITY BONG is a cannabis smoking device that uses water displacement.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DOOM", "SCROLLING", "TEXT", "NECK", "PILLOW", "PRINCESS", "TREATMENT", "RESISTANT", "STARCH"],
        narrative: "DOOM SCROLLING is the compulsive habit of reading negative news online. SCROLLING TEXT is the moving display of words across a screen. TEXT NECK is the neck strain condition caused by looking down at phones. A NECK PILLOW is the U-shaped travel cushion for sleeping upright. A PILLOW PRINCESS is slang for a passive sexual partner who receives but doesn't reciprocate. PRINCESS TREATMENT is being pampered and spoiled like royalty. TREATMENT-RESISTANT describes medical conditions that don't respond to standard therapies. RESISTANT STARCH is dietary fiber that resists digestion and feeds gut bacteria.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CONTENT", "MODERATION", "QUEUE", "FLOODING", "ATTACK", "HELICOPTER", "PARENTING", "STYLE", "ICON"],
        narrative: "CONTENT MODERATION is the practice of screening user-generated posts for policy violations. A MODERATION QUEUE is the backlog of flagged content awaiting human review. QUEUE FLOODING is a denial-of-service attack that overwhelms a system's processing queue. An ATTACK HELICOPTER is the military aircraft, or an offensive transphobic meme. HELICOPTER PARENTING is the overprotective style of hovering over children's activities. A PARENTING STYLE is a psychological classification of child-rearing approaches (authoritative, permissive, etc.). A STYLE ICON is someone whose fashion sense influences trends, like Audrey Hepburn or David Bowie.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["RIZZ", "GOD", "PARTICLE", "ACCELERATOR", "MASS", "SHOOTING", "STAR", "FUCKER", "JONES"],
        narrative: "RIZZ is Gen Z slang for charisma or the ability to attract romantic interest. A RIZZ GOD is someone with exceptional charm. The GOD PARTICLE is the nickname for the Higgs boson in particle physics. A PARTICLE ACCELERATOR is a machine like CERN's LHC that propels subatomic particles. ACCELERATOR MASS SPECTROMETRY is a technique for carbon dating using particle acceleration. A MASS SHOOTING is the tragic term for gun violence killing multiple victims. A SHOOTING STAR is a meteor burning up in Earth's atmosphere. STARFUCKER is vulgar slang for someone who seeks relationships with celebrities. STARFUCKER JONES is a British band or a reference to celebrity obsession.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SIGMA", "MALE", "GAZE", "AVERSION", "THERAPY", "DOG", "PILING", "ON", "READ"],
        narrative: "A SIGMA MALE is the internet's 'lone wolf' archetype who succeeds outside social hierarchies. The MALE GAZE is feminist film theory describing how media depicts women from a masculine perspective. GAZE AVERSION is the act of avoiding eye contact, common in autism or anxiety. AVERSION THERAPY is the controversial treatment pairing unwanted behavior with unpleasant stimuli. A THERAPY DOG provides emotional support to people in hospitals or disaster areas. DOG PILING is social media slang for mass attacks on a single target. PILING ON is the sports penalty for jumping onto a tackled player. An ON READ is when someone reads your message but doesn't reply.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["MASS", "MUTUAL", "AID", "DEPENDENCY", "INJECTION", "ATTACK", "SURFACE", "MOUNT", "RUSHMORE"],
        narrative: "MASSMUTUAL is the Massachusetts Mutual Life Insurance Company, a Fortune 500 financial services firm. MUTUAL AID is the anarchist practice of communities helping each other without charity hierarchy. AID DEPENDENCY is the criticism that foreign aid creates reliance rather than self-sufficiency. DEPENDENCY INJECTION is a software design pattern for loosely coupling components. An INJECTION ATTACK exploits vulnerabilities by inserting malicious code (SQL injection, XSS, etc.). An ATTACK SURFACE is the sum of all potential security vulnerabilities in a system. SURFACE MOUNT is the electronics manufacturing method of soldering components directly onto PCB surfaces. MOUNT RUSHMORE is the famous South Dakota monument featuring four U.S. presidents.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["RUSSIAN", "MAFIA", "STATE", "SECRET", "SANTA", "TRACKER", "FUND", "RAISING", "CANE"],
        narrative: "The RUSSIAN MAFIA is the organized crime network originating from the former Soviet Union. A MAFIA STATE is a government controlled by organized crime. A STATE SECRET is classified information protected by government. SECRET SANTA is the anonymous holiday gift exchange tradition. The SANTA TRACKER is NORAD's annual Christmas Eve flight-following program. A TRACKER FUND is an index fund that follows a market benchmark. FUND RAISING is the practice of soliciting donations for a cause. RAISING CANE'S is the Louisiana-founded chicken finger restaurant chain.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["UNHINGED", "KING", "SHIT", "POST", "TRUTH", "DECAY", "RATE", "LIMITING", "FACTOR"],
        narrative: "UNHINGED is slang for behaving erratically or without restraint. UNHINGED KING is ironic praise for chaotic behavior. KING SHIT is vulgar slang for feeling superior or dominant. A SHITPOST is deliberately low-quality or provocative internet content. POST-TRUTH describes the era where facts matter less than emotional appeals. TRUTH DECAY is the RAND Corporation's term for declining trust in facts and institutions. DECAY RATE measures how quickly radioactive material loses activity. RATE LIMITING is the API throttling technique to prevent server overload. A LIMITING FACTOR is the constraint that caps growth in a system.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CHRONICALLY", "ILL", "FATED", "LOVERS", "TROPE", "BUSTER", "RHYMES", "SCHEME", "PLOT"],
        narrative: "CHRONICALLY ILL describes someone with an ongoing health condition. ILL-FATED means destined for disaster or misfortune. FATED LOVERS is the trope of characters destined to be together (or tragically apart). A LOVERS TROPE is a recurring romantic storyline pattern in fiction. A TROPE BUSTER subverts or plays against established narrative conventions. BUSTER RHYMES is the legendary fast-rapping hip-hop artist. A RHYME SCHEME is the pattern of end sounds in poetry (ABAB, etc.). A SCHEME PLOT is a planned deception or conspiracy.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SLAPS", "DIFFERENT", "GRAVY", "TRAIN", "SIMULATOR", "SICKNESS", "BEHAVIOR", "CHART", "TOPPER"],
        narrative: "SLAPS is Gen Z slang meaning something is excellent or impressive. SLAPS DIFFERENT means something hits harder or is unexpectedly good. DIFFERENT GRAVY is British slang for being exceptionally high quality. A GRAVY TRAIN is an easy source of money or benefits. A TRAIN SIMULATOR is a video game genre for realistic railway operation. SIMULATOR SICKNESS is the motion-induced nausea from VR or simulation games. SICKNESS BEHAVIOR is the set of symptoms like fatigue and loss of appetite during illness. A BEHAVIOR CHART tracks actions for rewards (common in classrooms). A CHART TOPPER is a song that reaches #1 on music charts.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["DRUM", "BEAT", "DROP", "CULTURE", "VULTURE", "CAPITALISM", "DEATH", "SPIRAL", "FRACTURE"],
        narrative: "A DRUM BEAT is the rhythmic pattern played on drums. A BEAT DROP is the moment in electronic music when the bass kicks in. DROP CULTURE is the streetwear practice of releasing limited products without notice. A CULTURE VULTURE is someone who appropriates trends from other cultures for clout. VULTURE CAPITALISM describes predatory private equity that strips assets from companies. A CAPITALISM DEATH SPIRAL is the concept of systemic collapse from internal contradictions. A DEATH SPIRAL is an insurance term for adverse selection destroying a market, or a figure skating move. A SPIRAL FRACTURE is a bone break caused by twisting force.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["FERAL", "GIRL", "DINNER", "THEATRE", "KID", "TABLE", "READ", "RECEIPT", "HOARDER"],
        narrative: "FERAL describes wild, untamed behavior. FERAL GIRL is the TikTok persona of embracing chaotic, unpolished femininity. GIRL DINNER is the viral trend of cobbled-together snack plates as meals. DINNER THEATRE is the performance venue combining a meal with live entertainment. A THEATRE KID is the stereotypically dramatic drama club student. A KID TABLE is where children sit at family gatherings. A TABLE READ is an initial script read-through by a cast. READ RECEIPT is the notification that your message was seen. A RECEIPT HOARDER keeps every transaction record, often for tax anxiety.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["CAUGHT", "LACKING", "INFORMATION", "ASYMMETRY", "WARFARE", "STATE", "RELIGION", "CARD", "DECLINED"],
        narrative: "CAUGHT LACKING is slang for being caught unprepared or embarrassed. LACKING INFORMATION describes incomplete data. INFORMATION ASYMMETRY is the economics concept where one party has more knowledge in a transaction. ASYMMETRY WARFARE (asymmetric warfare) describes conflicts between mismatched opponents, like guerrilla tactics. WARFARE STATE is a government organized primarily for military purposes. STATE RELIGION is an officially endorsed faith, like Anglicanism in England. A RELIGION CARD is played when someone invokes faith to deflect criticism. CARD DECLINED is the embarrassing message when payment fails.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SOFT", "BOI", "SUMMER", "WALKER", "STALKER", "ZONE", "DIET", "CULTURE", "WAR"],
        narrative: "A SOFT BOI is the emotionally sensitive alternative to toxic masculinity. BOI SUMMER was the 2021 meme celebrating Hot Girl Summer's counterpart. A SUMMER WALKER is the R&B singer known for 'Playing Games.' A WALKER STALKER is a fan convention for The Walking Dead TV series. A STALKER ZONE is the dangerous approach area in the video game S.T.A.L.K.E.R. A ZONE DIET is the macronutrient-balanced eating plan from the 1990s. DIET CULTURE is the societal obsession with thinness and food restriction. A CULTURE WAR is the societal conflict over values and social norms.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["ORCHID", "MANTIS", "SHRIMP", "BOAT", "DOCK", "WORKER", "COMP", "TIME", "LORD"],
        narrative: "An ORCHID MANTIS is a praying mantis species that mimics orchid flowers. A MANTIS SHRIMP is a marine crustacean with powerful claws. A SHRIMP BOAT is a vessel used for commercial shrimp fishing. A BOAT DOCK is a structure where boats are moored. A DOCK WORKER is a longshoreman who loads and unloads cargo. WORKER COMP is short for workers' compensation insurance. COMP TIME is compensatory time off given for overtime work. A TIME LORD is a fictional alien species from Doctor Who.",
        difficulty: 'HARD'
    },
    {
        solution: ["ACCORDION", "FOLD", "MOUNTAIN", "PASS", "KEY", "LOGGER", "HEAD", "ACHE", "FREE"],
        narrative: "An ACCORDION FOLD is a zigzag paper-folding technique. A FOLD MOUNTAIN is a mountain formed by tectonic plate compression. A MOUNTAIN PASS is a navigable route through a mountain range. A PASS KEY is a master key that opens multiple locks. A KEY LOGGER is malicious software that records keystrokes. A LOGGER HEAD is a large sea turtle species known for its big head. A HEAD ACHE is pain in the head. ACHE FREE means without pain or discomfort.",
        difficulty: 'HARD'
    },
    {
        solution: ["WURLITZER", "ORGAN", "MEAT", "SPACE", "HEATER", "CORE", "ISSUE", "AREA", "CODE"],
        narrative: "A WURLITZER ORGAN is a pipe organ made by the famous Wurlitzer Company. ORGAN MEAT refers to edible internal organs of animals like liver and kidneys. MEAT SPACE is slang for the physical world, as opposed to cyberspace. A SPACE HEATER is a portable device for warming a room. A HEATER CORE is an automotive component that provides cabin heat. A CORE ISSUE is a fundamental or central problem. An ISSUE AREA is a domain of policy concern. An AREA CODE is a telephone dialing prefix for a geographic region.",
        difficulty: 'HARD'
    },
    {
        solution: ["GARBAGE", "DISPOSAL", "UNIT", "CIRCLE", "BACK", "DATED", "REFERENCE", "LIBRARY", "CARD"],
        narrative: "A GARBAGE DISPOSAL is a kitchen appliance that grinds food waste. A DISPOSAL UNIT is a mechanism for disposing of waste. A UNIT CIRCLE in mathematics is a circle with radius one. To CIRCLE BACK means to return to a topic later. BACK DATED refers to something given an earlier date retroactively. A DATED REFERENCE is an outdated source or citation. A REFERENCE LIBRARY is one where materials cannot be checked out. A LIBRARY CARD gives borrowing privileges at a library.",
        difficulty: 'HARD'
    },
    {
        solution: ["POWER", "OUTAGE", "REPAIR", "SHOP", "WINDOW", "DRESSING", "TABLE", "MANNERS", "COACH"],
        narrative: "POWER OUTAGE is a loss of electrical power. OUTAGE REPAIR refers to fixing a service interruption. A REPAIR SHOP is a business that fixes things. SHOP WINDOW is a display window in a store. WINDOW DRESSING means decorating windows or making something look better superficially. A DRESSING TABLE is a piece of furniture with a mirror for grooming. TABLE MANNERS are the etiquette rules for eating. A MANNERS COACH teaches proper social behavior and etiquette.",
        difficulty: 'EASY'
    },
    {
        solution: ["CARBON", "FOOTPRINT", "ANALYSIS", "BREAKDOWN", "LANE", "DEPARTURE", "LOUNGE", "CHAIR", "EXERCISE"],
        narrative: "A CARBON FOOTPRINT measures greenhouse gas emissions. FOOTPRINT ANALYSIS studies the impact or traces of activity. An ANALYSIS BREAKDOWN is a detailed examination of data. A BREAKDOWN LANE is an emergency stopping area on highways. LANE DEPARTURE refers to warning systems in vehicles. A DEPARTURE LOUNGE is an airport waiting area. A LOUNGE CHAIR is a comfortable reclining seat. CHAIR EXERCISE refers to seated fitness routines.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["STREAM", "SNIPE", "HUNT", "CLUB", "KID", "GLOVES", "OFF", "GRID", "LOCK"],
        narrative: "STREAM SNIPING is when gamers watch a live stream to gain unfair advantage. A SNIPE HUNT is a practical joke where someone is sent to find a nonexistent creature. A HUNT CLUB is a private organization for hunting enthusiasts. CLUB KIDS were NYC's notorious 1980s-90s nightlife personalities. KID GLOVES means handling something with extreme care and delicacy. GLOVES OFF means no restraint—anything goes. OFF GRID means living without public utilities or disconnected from mainstream systems. GRIDLOCK is severe traffic congestion or political stalemate.",
        difficulty: 'IMPOSSIBLE'
    },
    {
        solution: ["SLEEP", "OVER", "POWER", "TOOL", "BELT", "LINE", "BREAK", "NECK", "LACE"],
        narrative: "A SLEEPOVER is staying overnight at a friend's house. To OVERPOWER means to defeat with superior strength. A POWER TOOL is an electrically driven tool. A TOOL BELT holds tools for easy access while working. A BELTLINE is the waistline of a garment or a transit loop. A LINE BREAK is where text wraps to a new line. BREAKNECK means dangerously fast speed. A NECKLACE is jewelry worn around the neck.",
        difficulty: 'EASY'
    },
    {
        solution: ["SEEING", "RED", "BULL", "RING", "SIDE", "CAR", "PORT", "CITY", "STATE"],
        narrative: "SEEING RED means becoming extremely angry. RED BULL is the famous energy drink brand. A BULLRING is an arena where bullfighting takes place. RINGSIDE refers to seats closest to a boxing or wrestling ring. A SIDECAR is a one-wheeled attachment to a motorcycle. A CARPORT is a covered structure for parking a car. A PORT CITY is a city with a harbor for ships. A CITY-STATE is an independent city that governs itself.",
        difficulty: 'HARD'
    },
];