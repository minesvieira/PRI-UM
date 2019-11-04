function apagaAluno(ident){
    console.log('Vou apagar o aluno: ' + ident)
    axios.delete('/alunos/' + ident)
        .then(response => window.location.assign('/alunos'))
        .catch(error => console.log(error))
}


function apagaNota(identificador, indicador){
    console.log('Vou apagar a nota e indicador: ' + indicador)
    axios.delete('/alunos/' +identificador + '/notas/' +indicador)
        .then(response => window.location.assign('/alunos/' +identificador))
        .catch(error => console.log(error))
}

