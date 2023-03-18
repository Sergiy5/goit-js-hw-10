const tamp = `<h2><img src="{{flags.png}}" width = '40' alt="{{name.official}}">  {{name.official}}</h2>
<ul style='list-style: none'>
    <li>
       Capital: {{capital}}
    </li>
    <li>
        Population: {{population}}
    </li>
    <li>
    <ul style = 'list-style: none; padding: 0px'>
     languages: {{#each languages}}
        {{this}}{{#unless @last}},{{/unless}}
     {{/each}}
     </ul>   
    </li>    
</ul>`;

export default tamp