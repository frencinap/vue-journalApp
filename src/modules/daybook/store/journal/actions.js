import journalApi from "@/API/journalApi";

// llamamos la api con la siguiente acción
export const loadEntries = async ({ commit }) => {
  //la resp de axios viene con la data
  const { data } = await journalApi.get("/entries.json");
  // condicion si no hay entradas en la api
  if (!data) {
    commit("setEntries", []);
    return;
  }

  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }
  //console.log(entries);
  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, entry) => {
  //creamos la data que necesitamos
  const { date, picture, text } = entry;
  //esta es la data que queremos guardar
  const dataToSave = { date, picture, text };
  const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave);
  //console.log(resp);
  //commit de la mutación
  //commit("updateEntry", { ...entry });
  //pequeño cambio en relación a la sección de pruebas
  dataToSave.id = entry.id
  //nuevo commit
  commit('updateEntry', {...dataToSave})
};

export const createEntry = async ({ commit }, entry) => {
  //creamos la data que necesitamos
  const { date, picture, text } = entry;
  //esta es la data que queremos guardar
  const dataToSave = { date, picture, text };
  const { data } = await journalApi.post(`entries.json`, dataToSave);
  // en base al name que genera postman al crear una entrada, la usaremos como id
  dataToSave.id = data.name;
  //comit de la mutación
  commit("addEntry", dataToSave);

  return data.name;
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);

  commit("deleteEntry", id);
};
