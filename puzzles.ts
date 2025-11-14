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
        solution: ["GHOST", "WRITER", "ROOM", "MATE", "GUARDING", "RAIL", "GUN", "POWDER", "KEG"],
        narrative: "A person who writes for someone else is a GHOSTWRITER. A shared space is a WRITER'S ROOM. You can have a ROOMMATE. A specific behavior in evolutionary biology is MATE GUARDING. A safety barrier is a GUARDING RAIL. A weapon that uses electromagnetic force is a RAILGUN. An explosive substance is GUNPOWDER. You store beer in a POWDER KEG.",
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
        solution: ["POWER", "POINT", "BLANK", "CHECK", "MATE", "BOX", "SCORE", "KEEPER", "TALE"], 
        narrative: "A presentation slide is a POWERPOINT. At close range is POINT-BLANK. To have unlimited funds is to have a BLANK CHECK. The end of a chess game is CHECKMATE. A MATEBOX is a type of chess puzzle. A newspaper summary of a game is a BOX SCORE. The person tracking points is the SCOREKEEPER. A traditional story is a KEEPER'S TALE.", 
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
    }
];