const saveRoutineMutationGraphQL = `mutation saveRoutine($input: SaveRoutineInput!){
  saveRoutine(input:$input){
    routine{order
    name
    exercises{
      order
      id
      name
    }}
  }
}`;

export { saveRoutineMutationGraphQL };
