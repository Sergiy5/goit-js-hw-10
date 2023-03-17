const tamp = `<h2><img src="{{flags.png}}" width = '40' alt="{{name.official}}">  {{name.official}}</h2>
<ul style='list-style: none'>
    <li>
       Capital: {{capital}}
    </li>
    <li>
        Population: {{population}}
    </li>
    <li>
     {{#each languages}}
        languages: {{this}}
     {{/each}}   
    </li>    
</ul>`;

export default tamp