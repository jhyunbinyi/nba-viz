<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  import atlantaHawksLogo from '../components/logos/atlanta-hawks-logo.svg';
  import bostonCelticsLogo from '../components/logos/boston-celtics-logo.svg';
  import brooklynNetsLogo from '../components/logos/brooklyn-nets-logo-symbol.svg';
  import charlotteHornetsLogo from '../components/logos/charlotte-hornets-logo.svg';
  import chicagoBullsLogo from '../components/logos/chicago-bulls-logo.svg';
  import clevelandCavaliersLogo from '../components/logos/cleveland-cavaliers-logo-symbol.svg';
  import dallasMavericksLogo from '../components/logos/dallas-mavericks-logo-symbol.svg';
  import denverNuggetsLogo from '../components/logos/denver-nuggets-logo-symbol.svg';
  import detroitPistonsLogo from '../components/logos/detroit-pistons-logo.svg';
  import goldenStateWarriorsLogo from '../components/logos/golden-state-warriors-logo-2020.svg';
  import houstonRocketsLogo from '../components/logos/houston-rockets-logo-symbol.svg';
  import indianaPacersLogo from '../components/logos/indiana-pacers-logo.svg';
  import laClippersLogo from '../components/logos/los-angeles-clippers-logo-symbol.svg';
  import losAngelesLakersLogo from '../components/logos/los-angeles-lakers-logo-symbol.svg';
  import memphisGrizzliesLogo from '../components/logos/memphis-grizzlies-logo.svg';
  import miamiHeatLogo from '../components/logos/miami-heat-logo-symbol.svg';
  import milwaukeeBucksLogo from '../components/logos/milwaukee-bucks-logo.svg';
  import minnesotaTimberwolvesLogo from '../components/logos/minnesota-timberwolves-logo.svg';
  import newOrleansPelicansLogo from '../components/logos/orleans-pelicans-logo.svg';
  import newYorkKnicksLogo from '../components/logos/new-york-knicks-logo.svg';
  import oklahomaCityThunderLogo from '../components/logos/oklahoma-city-thunder-logo-symbol.svg';
  import orlandoMagicLogo from '../components/logos/orlando-magic-logo-symbol.svg';
  import philadelphia76ersLogo from '../components/logos/philadelphia-76ers-logo.svg';
  import phoenixSunsLogo from '../components/logos/phoenix-suns-logo-symbol.svg';
  import portlandTrailBlazersLogo from '../components/logos/portland-trail-blazers-logo-symbol.svg';
  import sacramentoKingsLogo from '../components/logos/sacramento-kings-logo.svg';
  import sanAntonioSpursLogo from '../components/logos/san-antonio-spurs-logo-symbol.svg';
  import torontoRaptorsLogo from '../components/logos/toronto-raptors-logo-2020.svg';
  import utahJazzLogo from '../components/logos/utah-jazz-logo-symbol.svg';
  import washingtonWizardsLogo from '../components/logos/washington-wizards-logo-symbol.svg';

  let conference = "All";
  let maxWins = 82;
  let selectedYear = "2022-23";

  let data = [
    { x: 41, y: 149836313, svg: atlantaHawksLogo, conference: "East", team: "Atlanta Hawks", losses: 41, year: "2022-23" },
    { x: 57, y: 178633307, svg: bostonCelticsLogo, conference: "East", team: "Boston Celtics", losses: 25, year: "2022-23" },
    { x: 45, y: 159566723, svg: brooklynNetsLogo, conference: "East", team: "Brooklyn Nets", losses: 37, year: "2022-23" },
    { x: 27, y: 125874047, svg: charlotteHornetsLogo, conference: "East", team: "Charlotte Hornets", losses: 55, year: "2022-23" },
    { x: 40, y: 151964990, svg: chicagoBullsLogo, conference: "East", team: "Chicago Bulls", losses: 42, year: "2022-23" },
    { x: 51, y: 151966241, svg: clevelandCavaliersLogo, conference: "East", team: "Cleveland Cavaliers", losses: 31, year: "2022-23" },
    { x: 38, y: 177244238, svg: dallasMavericksLogo, conference: "West", team: "Dallas Mavericks", losses: 44, year: "2022-23" },
    { x: 53, y: 162338665, svg: denverNuggetsLogo, conference: "West", team: "Denver Nuggets", losses: 29, year: "2022-23" },
    { x: 17, y: 129153570, svg: detroitPistonsLogo, conference: "East", team: "Detroit Pistons", losses: 65, year: "2022-23" },
    { x: 44, y: 192386134, svg: goldenStateWarriorsLogo, conference: "West", team: "Golden State Warriors", losses: 38, year: "2022-23" },
    { x: 22, y: 137579793, svg: houstonRocketsLogo, conference: "West", team: "Houston Rockets", losses: 60, year: "2022-23" },
    { x: 35, y: 125706114, svg: indianaPacersLogo, conference: "East", team: "Indiana Pacers", losses: 47, year: "2022-23" },
    { x: 44, y: 192905421, svg: laClippersLogo, conference: "West", team: "LA Clippers", losses: 38, year: "2022-23" },
    { x: 43, y: 169391473, svg: losAngelesLakersLogo, conference: "West", team: "Los Angeles Lakers", losses: 39, year: "2022-23" },
    { x: 51, y: 127139520, svg: memphisGrizzliesLogo, conference: "West", team: "Memphis Grizzlies", losses: 31, year: "2022-23" },
    { x: 44, y: 151408266, svg: miamiHeatLogo, conference: "East", team: "Miami Heat", losses: 38, year: "2022-23" },
    { x: 58, y: 182930771, svg: milwaukeeBucksLogo, conference: "East", team: "Milwaukee Bucks", losses: 24, year: "2022-23" },
    { x: 42, y: 145793656, svg: minnesotaTimberwolvesLogo, conference: "West", team: "Minnesota Timberwolves", losses: 40, year: "2022-23" },
    { x: 42, y: 148360910, svg: newOrleansPelicansLogo, conference: "West", team: "New Orleans Pelicans", losses: 40, year: "2022-23" },
    { x: 47, y: 148987936, svg: newYorkKnicksLogo, conference: "East", team: "New York Knicks", losses: 35, year: "2022-23" },
    { x: 40, y: 148856338, svg: oklahomaCityThunderLogo, conference: "West", team: "Oklahoma City Thunder", losses: 42, year: "2022-23" },
    { x: 34, y: 126107324, svg: orlandoMagicLogo, conference: "East", team: "Orlando Magic", losses: 48, year: "2022-23" },
    { x: 54, y: 150496913, svg: philadelphia76ersLogo, conference: "East", team: "Philadelphia 76ers", losses: 28, year: "2022-23" },
    { x: 45, y: 176042453, svg: phoenixSunsLogo, conference: "West", team: "Phoenix Suns", losses: 37, year: "2022-23" },
    { x: 33, y: 144997250, svg: portlandTrailBlazersLogo, conference: "West", team: "Portland Trail Blazers", losses: 49, year: "2022-23" },
    { x: 48, y: 139423615, svg: sacramentoKingsLogo, conference: "West", team: "Sacramento Kings", losses: 34, year: "2022-23" },
    { x: 22, y: 104545376, svg: sanAntonioSpursLogo, conference: "West", team: "San Antonio Spurs", losses: 60, year: "2022-23" },
    { x: 41, y: 150992313, svg: torontoRaptorsLogo, conference: "East", team: "Toronto Raptors", losses: 41, year: "2022-23" },
    { x: 37, y: 148738241, svg: utahJazzLogo, conference: "West", team: "Utah Jazz", losses: 45, year: "2022-23" },
    { x: 35, y: 152008934, svg: washingtonWizardsLogo, conference: "East", team: "Washington Wizards", losses: 47, year: "2022-23" },
    { x: 43, y: 140632234, svg: atlantaHawksLogo, conference: "East", team: "Atlanta Hawks", losses: 39, year: "2021-22" },
    { x: 51, y: 178980766, svg: goldenStateWarriorsLogo, conference: "West", team: "Golden State Warriors", losses: 29, year: "2021-22" },
    { x: 44, y: 174811922, svg: brooklynNetsLogo, conference: "East", team: "Brooklyn Nets", losses: 38, year: "2021-22" },
    { x: 43, y: 168378382, svg: laClippersLogo, conference: "West", team: "LA Clippers", losses: 40, year: "2021-22" }, 
    { x: 46, y: 164409293, svg: losAngelesLakersLogo, conference: "West", team: "Los Angeles Lakers", losses: 49, year: "2021-22" },
    { x: 44, y: 160875421, svg: milwaukeeBucksLogo, conference: "East", team: "Milwaukee Bucks", losses: 31, year: "2021-22" },
    { x: 52, y: 147048036, svg: dallasMavericksLogo, conference: "West", team: "Dallas Mavericks", losses: 30, year: "2021-22" },
    { x: 48, y: 156153892, svg: denverNuggetsLogo, conference: "West", team: "Denver Nuggets", losses: 34, year: "2021-22" },
    { x: 23, y: 124174512, svg: detroitPistonsLogo, conference: "East", team: "Detroit Pistons", losses: 59, year: "2021-22" },
    { x: 20, y: 127101611, svg: houstonRocketsLogo, conference: "West", team: "Houston Rockets", losses: 62, year: "2021-22" },
    { x: 25, y: 128774894, svg: indianaPacersLogo, conference: "East", team: "Indiana Pacers", losses: 57, year: "2021-22" },
    { x: 56, y: 128736936, svg: memphisGrizzliesLogo, conference: "West", team: "Memphis Grizzlies", losses: 26, year: "2021-22" },
    { x: 53, y: 147709897, svg: miamiHeatLogo, conference: "East", team: "Miami Heat", losses: 29, year: "2021-22" },
    { x: 46, y: 139703134, svg: minnesotaTimberwolvesLogo, conference: "West", team: "Minnesota Timberwolves", losses: 36, year: "2021-22" },
    { x: 36, y: 137803754, svg: newOrleansPelicansLogo, conference: "West", team: "New Orleans Pelicans", losses: 46, year: "2021-22" },
    { x: 37, y: 134401888, svg: newYorkKnicksLogo, conference: "East", team: "New York Knicks", losses: 45, year: "2021-22" },
    { x: 24, y: 114444987, svg: oklahomaCityThunderLogo, conference: "West", team: "Oklahoma City Thunder", losses: 58, year: "2021-22" },
    { x: 22, y: 124052844, svg: orlandoMagicLogo, conference: "East", team: "Orlando Magic", losses: 60, year: "2021-22" },
    { x: 51, y: 143927793, svg: philadelphia76ersLogo, conference: "East", team: "Philadelphia 76ers", losses: 31, year: "2021-22" },
    { x: 64, y: 134392665, svg: phoenixSunsLogo, conference: "West", team: "Phoenix Suns", losses: 18, year: "2021-22" },
    { x: 27, y: 134301329, svg: portlandTrailBlazersLogo, conference: "West", team: "Portland Trail Blazers", losses: 55, year: "2021-22" },
    { x: 30, y: 126267892, svg: sacramentoKingsLogo, conference: "West", team: "Sacramento Kings", losses: 52, year: "2021-22" },
    { x: 34, y: 111712494, svg: sanAntonioSpursLogo, conference: "West", team: "San Antonio Spurs", losses: 48, year: "2021-22" },
    { x: 48, y: 138676920, svg: torontoRaptorsLogo, conference: "East", team: "Toronto Raptors", losses: 34, year: "2021-22" },
    { x: 49, y: 150226936, svg: utahJazzLogo, conference: "West", team: "Utah Jazz", losses: 33, year: "2021-22" },
    { x: 35, y: 122856847, svg: washingtonWizardsLogo, conference: "East", team: "Washington Wizards", losses: 47, year: "2021-22" }
];

let filteredData = data;

  function updateFilteredData() {
    filteredData = data.filter(d => {
      return (conference === "All" || d.conference === conference) && 
             d.x <= maxWins &&
             d.year === selectedYear;
    });
    drawChart();
  }

  onMount(() => {
    updateFilteredData();
  });

  function drawChart() {
    const svgWidth = 800;
    const svgHeight = 700;
    const margin = { top: 30, right: 30, bottom: 60, left: 90 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#scatter")
                  .html("")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight)
                  .append("g")
                  .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const tooltip = d3.select("#tooltip")
                      .style("opacity", 0)
                      .style("pointer-events", "none");

    const xScale = d3.scaleLinear()
                     .domain([0, 82])
                     .range([0, width]);

    const yScale = d3.scaleLinear()
                     .domain([90000000, 200000000])
                     .range([height, 0]);

    svg.append("g")
       .attr("class", "grid")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(xScale)
               .tickSize(-height)
               .tickFormat(""))
       .selectAll("line")
       .attr("stroke-opacity", 0.1);

    svg.append("g")
       .attr("class", "grid")
       .call(d3.axisLeft(yScale)
               .tickSize(-width)
               .tickFormat(""))
       .selectAll("line")
       .attr("stroke-opacity", 0.1);

    svg.append("g")
       .call(d3.axisLeft(yScale).tickFormat(d => `${d / 1000000}M`));

    svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(xScale));

    const circles = svg.selectAll("circle")
                       .data(filteredData)
                       .enter()
                       .append("circle")
                       .attr("cx", d => xScale(d.x))
                       .attr("cy", d => yScale(d.y))
                       .attr("r", 20)
                       .attr("fill", "transparent")
                       .style("cursor", "pointer")
                       .on("mouseover", function(event, d) {
                          tooltip.transition()
                                 .duration(200)
                                 .style("opacity", .9);
                          tooltip.html(`<strong>${d.team},<br> ${d.conference}</strong><br>Wins: ${d.x}<br>Losses: ${d.losses}<br>Year: ${d.year}`);
                          d3.select(this)
                            .transition()
                            .duration(200);
                        })
                       .on("mouseout", function() {
                          tooltip.transition()
                                 .duration(300)
                                 .style("opacity", 0);
                          d3.select(this)
                            .transition()
                            .duration(200);
                        });

    const images = svg.selectAll("image")
                      .data(filteredData)
                      .enter()
                      .append("image")
                      .attr("href", d => d.svg)
                      .attr("width", 30)
                      .attr("height", 30)
                      .attr("x", d => xScale(d.x) - 15)
                      .attr("y", d => yScale(d.y) - 15)
                      .style("cursor", "pointer")
                      .on("mouseover", function(event, d) {
                          tooltip.transition()
                                 .duration(200)
                                 .style("opacity", .9);
                          tooltip.html(`<strong>${d.team},<br> ${d.conference}</strong><br>Wins: ${d.x}<br>Losses: ${d.losses}<br>Year: ${d.year}`);
                          d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("width", 40)
                            .attr("height", 40)
                            .attr("x", xScale(d.x) - 20)
                            .attr("y", yScale(d.y) - 20);
                        })
                      .on("mouseout", function() {
                          tooltip.transition()
                                 .duration(300)
                                 .style("opacity", 0);
                          d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("width", 30)
                            .attr("height", 30)
                            .attr("x", d => xScale(d.x) - 15)
                            .attr("y", d => yScale(d.y) - 15);
                        });

    svg.append("text")
       .attr("text-anchor", "middle")
       .attr("x", width / 2)
       .attr("y", height + margin.bottom - 10)
       .text("Wins")
       .attr("class", "axis-label");

    svg.append("text")
       .attr("text-anchor", "end")
       .attr("transform", "rotate(-90)")
       .attr("y", -margin.left + 20)
       .attr("x", -height / 2 + margin.top)
       .text("Salary (USD)")
       .attr("class", "axis-label");
  }
</script>

<div class="container">
  <h1 class="title">NBA Salary vs. Team Performance</h1>
  <div class="controls">
    <label for="conference-select">Conference: </label>
    <select id="conference-select" bind:value={conference} on:change={updateFilteredData}>
      <option value="All">All</option>
      <option value="East">East</option>
      <option value="West">West</option>
    </select>
    
    <label for="max-wins-slider">Wins: </label>
    <input type="range" id="max-wins-slider" min="0" max="82" bind:value={maxWins} on:input={updateFilteredData}>
    
    <label for="year-select">Year: </label>
    <select id="year-select" bind:value={selectedYear} on:change={updateFilteredData}>
      <option value="2022-23">2022-23</option>
      <option value="2021-22">2021-22</option>
    </select>
  </div>
  <div id="scatter-tooltip-container">
    <div id="scatter"></div>
    <div id="tooltip" class="tooltip"></div>
  </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  background: #f7f9fc;
  position: relative;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-top: 150px;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#scatter-tooltip-container {
  display: flex;
  position: relative;
}

#scatter {
  border: 1px solid #ddd;
  width: 800px;
  height: 700px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: default;
}

.tooltip {
  width: 180px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  margin-left: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

label {
  margin-right: 10px;
  font-weight: 600;
  font-size: 14px;
}

select, input[type="range"] {
  margin-right: 20px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.axis-label {
  font-size: 14px;
  font-weight: 600;
  fill: #333;
}
</style>