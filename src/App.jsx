import "./App.css"
import { db } from "./firebase-config"
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore"
import ColorModeSwitcher from "./ColorModeSwitcher"
import {
  VStack,
  Box,
  HStack,
  Button,
  RadioGroup,
  Stack,
  Textarea,
  Radio,
} from "@chakra-ui/react"
import React from "react"
import { async } from "@firebase/util"

function App() {
  const usersNotes = collection(db, "notes")
  const [notes, setNotes] = React.useState([])
  const [textareaValue, setTextareaValue] = React.useState("")
  const [checkCondition, setCheckCondition] = React.useState(false)
  const [currentId, setCurrentId] = React.useState("")

  const gettingValue = (id, text) => {
    setTextareaValue(text)
    setCurrentId(id)
    setCheckCondition(true)
  }

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id)
    await deleteDoc(noteDoc)
  }

  async function updateNote() {
    const noteDoc = doc(db, "notes", currentId)
    await updateDoc(noteDoc, { note: textareaValue, id: currentId })
  }

  async function saveNote() {
    if (checkCondition) {
      updateNote()
      setTextareaValue("")
      setCheckCondition(false)
    } else {
      if (textareaValue !== "") {
        addDoc(usersNotes, { note: textareaValue })
        setTextareaValue("")
      }
    }
  }

  React.useState(() => {
    async function getNotes() {
      const data = await getDocs(usersNotes)
      setNotes(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
      )
    }
    getNotes()
  }, [notes])

  console.log(notes)

  return (
    <>
      <ColorModeSwitcher />
      <Box
        marginTop={"5rem"}
        w={"100%"}
        h="50vh"
        justifyContent={"center"}
        alignItems="center"
        display={"flex"}
      >
        <Textarea
          bg="gray.200"
          color={"black"}
          fontSize={"25px"}
          m="4"
          rows={"10"}
          placeholder="Enter your note"
          size="sm"
          onChange={(e) => setTextareaValue(e.target.value)}
          value={textareaValue}
        />
      </Box>
      <HStack p="5" m="5" justifyContent={"center"}>
        <Button onClick={saveNote}>
          {checkCondition ? "Update note" : "Save note"}
        </Button>
      </HStack>
      <HStack alignItems={"center"} flexWrap={"wrap"}>
        {notes.map((noteItem) => {
          return (
            <div className="note-cont">
              <p>{noteItem.note}</p>
              <HStack>
                <Button onClick={() => deleteNote(noteItem.id)}>Delete</Button>
                <Button
                  onClick={() => gettingValue(noteItem.id, noteItem.note)}
                >
                  Update
                </Button>
              </HStack>
            </div>
          )
        })}
      </HStack>
    </>
  )
}

export default App
