import React, { useState } from "react";
import { Box, Center, Container, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/validation";
import { yupResolver } from "@hookform/resolvers";
import { AddIcon, CopyIcon, DeleteIcon, HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";

const ExamForm = () => {
  const [activeQ, setAciveQ] = useState();

  const { register, handleSubmit, getValues, setValue, trigger, reset, errors, watch } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const watchNumberOfSections = watch("numberOfSections");
  const watchNumberOfQuestions = watch("sections.questions");

  function sections() {
    return [...Array(parseInt(watchNumberOfSections || 1)).keys()];
  }

  function questions() {
    return [...Array(parseInt(watchNumberOfQuestions || 1)).keys()];
  }

  function addNewQuestion() {
    console.log(watchNumberOfQuestions);
  }

  function onSubmit(data) {
    console.log({ data }, getValues());
  }

  function questionAnswer(qType) {
    console.log(qType);

    switch (qType) {
      case "single": {
        return (
          <RadioGroup defaultValue="1">
            <Stack spacing={4}>
              <Radio value="1">
                <InputGroup size="sm" padding="5px" borderRadius="5" bgColor="#F2D8D5">
                  <InputLeftAddon background="transparent" bgColor="#733D47" color="white" rounded children="A" />
                  <Input
                    readOnly
                    border="none"
                    borderRight="0"
                    value="Option One"
                    // name={`sections[${s}].questions[${q}].totalMarks`}
                    ref={register}
                  />
                  <InputRightAddon border="none" opacity=".7" background="transparent" children={<SmallCloseIcon />} />
                </InputGroup>
              </Radio>

              <Radio value="2">
                <InputGroup size="sm" padding="5px" borderRadius="5" bgColor="#F2D8D5">
                  <InputLeftAddon background="transparent" bgColor="#733D47" color="white" rounded children="A" />
                  <Input
                    readOnly
                    border="none"
                    borderRight="0"
                    value="Option One"
                    // name={`sections[${s}].questions[${q}].totalMarks`}
                    ref={register}
                  />
                  <InputRightAddon border="none" opacity=".7" background="transparent" children={<SmallCloseIcon />} />
                </InputGroup>
              </Radio>

              <Radio isDisabled>
                <InputGroup size="sm" padding="5px" borderRadius="5" bgColor="#F2D8D5">
                  <InputLeftAddon background="transparent" bgColor="#733D47" color="white" rounded children="A" />
                  <Input
                    border="none"
                    borderRight="0"
                    value="Option One"
                    // name={`sections[${s}].questions[${q}].totalMarks`}
                    ref={register}
                  />
                  <InputRightAddon border="none" opacity=".7" background="transparent" children={<SmallCloseIcon />} />
                </InputGroup>
              </Radio>
            </Stack>
          </RadioGroup>
        );
      }

      default:
        return null;
    }
  }

  return (
    <div>
      <Heading size="lg" fontWeight="500" borderBottom="1px solid #333" marginBottom="5" paddingBottom="20px">
        Create Questions
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <div className="card m-3">
          {sections().map((s) => (
            <Container maxW="container.md" key={s}>
              <Box boxShadow="lg" p="6" rounded="md" bg="white">
                <Input
                  name={`sections[${s}].sectionName`}
                  ref={register}
                  fontSize="22"
                  marginBottom="5"
                  border="none"
                  placeholder="Section Name"
                />
                <Textarea
                  name={`sections[${s}].sectionDesc`}
                  ref={register}
                  placeholder="Description (optional)"
                  border="none"
                />

                <Checkbox name={`sections[${s}].shuffleQuestions`} ref={register}>
                  Shuffle Questions
                </Checkbox>
              </Box>

              {questions().map((q) => (
                <Box
                  boxShadow="lg"
                  marginTop="10"
                  marginBottom="10"
                  p="6"
                  rounded="md"
                  bg="white"
                  key={q}
                  position="relative"
                >
                  <Stack
                    spacing="5"
                    position="absolute"
                    right="-12"
                    top="0"
                    color="white"
                    bgColor="#733D47"
                    padding="10px"
                    borderRadius="5"
                  >
                    <AddIcon onClick={addNewQuestion} />
                    <CopyIcon />
                    <DeleteIcon />
                    <HamburgerIcon />
                  </Stack>

                  <Flex>
                    <Stack spacing="5" w="33%" borderRight="0.5px solid #333" paddingRight="5">
                      <Select
                        bgColor="#F2D8D5"
                        placeholder="Question Type"
                        name={`sections[${s}].questions[${q}].questionType`}
                        ref={register}
                        onChange={() => trigger()}
                      >
                        <option value="single">Signle Choice</option>
                        <option value="multi">Multiple Choice</option>
                        <option value="file">File Upload</option>
                        <option value="paragraph">Paragraph</option>
                      </Select>

                      <FormControl>
                        <FormLabel opacity=".7" fontSize="12" display="block" children="Total Marks" />

                        <InputGroup size="sm">
                          <Input
                            borderRight="0"
                            placeholder="Total Marks"
                            name={`sections[${s}].questions[${q}].totalMarks`}
                            ref={register}
                          />
                          <InputRightAddon opacity=".7" background="transparent" children="marks" />
                        </InputGroup>
                      </FormControl>

                      <FormControl>
                        <FormLabel opacity=".7" fontSize="12" display="block" children="Negative Marks" />

                        <InputGroup size="sm">
                          <Input
                            borderRight="0"
                            placeholder="Negative Marks"
                            name={`sections[${s}].questions[${q}].negativeMarks`}
                            ref={register}
                          />
                          <InputRightAddon opacity=".7" background="transparent" children="marks" />
                        </InputGroup>
                      </FormControl>

                      <Checkbox name={`sections[${s}].questions[${q}].isOptional`} ref={register}>
                        Optional
                      </Checkbox>
                    </Stack>

                    <Center flex="1">{questionAnswer(getValues(`sections[${s}].questions[${q}].questionType`))}</Center>
                  </Flex>
                </Box>
              ))}
            </Container>
          ))}

          <Container marginTop="10" textAlign="right" maxW="container.md">
            <Button type="reset" marginRight="5" background="transparent">
              Discard
            </Button>

            <Button type="submit" onClick={() => onSubmit()}>
              Publish
            </Button>
          </Container>
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
