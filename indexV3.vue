<!DOCTYPE HTML>
<html>

<head>
    <link rel="stylesheet" href="stylesheet.css">
    <link href="https://fonts.google.apis.com/css?family=Curtive+Mono" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/typeit@5.5.0/dist/typeit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="DriverScriptV2.js"></script>
    <title>#Operation Last Hope#</title>
</head>

<body>
<div id="screen">
    <div id="story" class="clickable">Click to begin</div>

    <div id="hintSection"></div>

    <div id="resources" class="no-select">
        <h1 class="sectionTitle">Resources</h1>
        <table id="resourceGrid" class="pointer">

            <tr id='tierIResources'>
                <td id="stone">0</td>
                <td id="copper">0</td>
                <td id="iron">0</td>
                <td id="coal">0</td>
            </tr>

            <tr id="tierIIResources">
                <td id="hardStone"></td>
                <td id="copperPlates"></td>
                <td id="ironPlates"></td>
                <td id="cokeCoal"></td>
            </tr>

        </table>
    </div>

    <div id="machines" class="no-select">

        <h1 class="sectionTitle">Machines</h1>

        <table>

            <tr class="pointer" id="mines">
                <td onclick="" id="stoneMine"></td>
                <td onclick="" id="copperMine"></td>
                <td onclick="" id="ironMine"></td>
                <td onclick="" id="coalMine"></td>
            </tr>

            <tr class="pointer" id="mineSwitches">
                <td onclick="" id="stoneMineSwitch"></td>
                <td onclick="" id="copperMineSwitch"></td>
                <td onclick="" id="ironMineSwitch"></td>
                <td onclick="" id="coalMineSwitch"></td>
            </tr>

            <tr class="pointer" id="fuelSources">
                <td onclick="" id="stoneMineFuel"></td>
                <td onclick="" id="copperMineFuel"></td>
                <td onclick="" id="ironMineFuel"></td>
                <td onclick="" id="coalMineFuel"></td>
            </tr>

        </table>

    </div>

    <div id="upgrades">

        <h1 class="sectionTitle">Upgrades</h1>

        <div id="upgrade-list"></div>

    </div>

</div>

</body>
</html>