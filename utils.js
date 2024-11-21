/*
    render the following:
    {
      'ID': frame['ID'],
      'name': frame['name'],
      'definition': frame['definition'],
      'FE':[[x,frame.FE[x]['ID'],int(frame.FE[x]['coreType']=='Core'),frame.FE[x].definition] for x in frame.FE],
      'lexUnit':[[x.split('.')[0],x.split('.')[-1]] for x in frame.lexUnit],
      'frameRelations': [[x['type']['name'],x['type']['subFrameName'],x['type']['superFrameName'],x['subID'],x['supID']] for x in frame.frameRelations]
  }
*/
function render_frame(frame){
    var output = `
        <div class="card mb-4">
            <div class="card-header">
                <h4 class="my-0 font-weight-normal">${frame['name']}</h4>
            </div>
            <div class="card-body">
                <p><strong>ID:</strong> ${frame['ID']}</p>
                <p><strong>Definition:</strong> ${frame['definition']}</p>
                
                
    `;

    
    // add frame relations
    output += `<p><strong>Frame Relations:</strong></p><ul>`;
    for (var i = 0; i < frame['frameRelations'].length; i++) {
        var fr = frame['frameRelations'][i];

        var name1 = `<a target="_blank" href="#${fr[3]}">${frame_data[fr[3]]['name']}</a>`;
        var name2 = `<a target="_blank" href="#${fr[4]}">${frame_data[fr[4]]['name']}</a>`;
        // bold whichever one is us
        if (fr[3] == frame['ID']) {
            name1 = `<b>${name1}</b>`;
        } else if (fr[4] == frame['ID']) {
            name2 = `<b>${name2}</b>`;
        }

        output += `<li><b>${fr[0]}</b>: (${fr[1]} ${name1}) -> (${fr[2]} ${name2}) </li>`;
    }
    output += `</ul>`;

    output += `<p><strong>Frame Elements:</strong></p><ul>`;
    for (var i = 0; i < frame['FE'].length; i++) {
        var fe = frame['FE'][i]
        classes = ''
        if (frame['FE'][i][2]) {
            classes = 'font-weight-bold';
        }
        // i should be small
        output += `<li class="${classes}">${fe[0]} ${(fe[2]==1)?'(Core)':''}: <i class="small text-muted"> ${fe[3]} </i></li>`;
    }
    output += `</ul>
                <p><strong>Lexical Units:</strong></p>
                <div class="btn-group flex-wrap" role="group" aria-label="Lexical Units">
    `;
    // instead of another unordered list, just make buttons for each color-codes by the POS tag
    for (var i = 0; i < frame['lexUnit'].length; i++) {
        var lexUnit = frame['lexUnit'][i]
        var pos = lexUnit[1]
        var classes = 'btn btn-sm m-1 px-2 ';
        if (pos == 'n') {
            classes += 'bg-primary text-white';
        } else if (pos == 'v') {
            classes += 'bg-success text-white';
        } else if (pos == 'a') {
            classes += 'bg-warning text-dark';
        } else if (pos == 'adv') {
            classes += 'bg-info text-white';
        } else {
            classes += 'bg-secondary text-white';
        }
        output += `<button class="${classes}">${lexUnit[0]}</button> `;
    }
    output += `</div>`
    // now add color code for POS
    output += `
        <div class="card-footer text-muted">
            <p><span class="badge badge-primary">Noun</span> <span class="badge badge-success">Verb</span> <span class="badge badge-warning">Adjective</span> <span class="badge badge-info">Adverb</span> <span class="badge badge-secondary">Other</span></p>
        </div>
    `
    output += `
            </div>
        </div>
    `;
    return output;
}