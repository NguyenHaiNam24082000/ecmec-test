import { postRecruitDetail } from '@apis/recruitApi';
import { Button, Divider, Group, Modal, NumberInput, Paper, Table, Tabs, Text, TextInput, TypographyStylesProvider, Input, Switch, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import RichTextEditor from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getRecruitApi } from 'redux/reducer/recruit.slice';

const labels = {
    roleVn: 'Tiêu đề',
    roleEn: 'Title',
    addressVn: 'Địa chỉ',
    addressEn: 'Address',
    contentVn: 'Mô tả',
    contentEn: 'Description',
    salary: 'Lương'
};

function Recruit() {
    const dispatch = useAppDispatch();
    const listRecruit = useAppSelector((state) => state.recruit.recruit);
    const [openedModalAddInfo, setOpenedModalAddInfo] = useState(false);
    const [openedModalInfo, setOpenedModalInfo] = useState({
        index: 0,
        isOpen: false,
    });
    const form = useForm({
        initialValues: {
            id: listRecruit?.length || 0,
            roleVn: '',
            roleEn: '',
            addressVn: '',
            addressEn: '',
            contentVn: '',
            contentEn: '',
            salary: '',
            isShow: true,
            priority: listRecruit?.length || 0,
            createdTime: Date.now(),
            createdUser: 'admin',
            modifiedTime: Date.now(),
            modifiedUser: 'admin'
        },

        validate: {
            //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const isVietTabEmpty = form?.values?.roleVn?.length && form?.values?.addressVn?.length && form?.values?.contentVn?.length;
    const isEnglishTabEmpty = form?.values?.roleEn?.length && form?.values?.addressEn?.length && form?.values?.contentEn?.length;
    const getRecruit = () => {
        dispatch(getRecruitApi());
    };
    useEffect(() => {
        getRecruit();
    }, []);
    return (
        <Paper shadow="xs" p="md">
            <Button onClick={() => {
                setOpenedModalAddInfo(true);
            }}>Tạo mới</Button>
            <Table highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>Hiển thị</th>
                        <th>{labels.roleVn}</th>
                        <th>{labels.addressVn}</th>
                        <th>{labels.salary}</th>
                        <th>Độ ưu tiên</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !!listRecruit?.length && listRecruit.map((recruit, index) => (
                            <tr key={recruit.id}>
                                <td><Switch /></td>
                                <td>
                                    <Anchor onClick={() => {
                                        setOpenedModalInfo({
                                            index,
                                            isOpen: true,
                                        });
                                    }}>
                                        {recruit.roleVn}
                                    </Anchor>
                                </td>
                                <td>{recruit.addressVn}</td>
                                <td>{recruit.salary}</td>
                                <td></td>
                                <td>
                                    <Group grow>
                                        <Button onClick={() => {
                                        setOpenedModalInfo({
                                            index,
                                            isOpen: true,
                                        });
                                    }}>Xem</Button>
                                        <Button>Sửa</Button>
                                        <Button>Xoá</Button>
                                    </Group>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Modal
                opened={openedModalInfo.isOpen}
                onClose={() => {
                    setOpenedModalInfo({
                        index: 0,
                        isOpen: false,
                    });
                }}
                size="100%"
                title="Thông tin chi tiết"
            >
                <Table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{ __html: listRecruit?.at(openedModalInfo.index)?.contentVn || '' }} />
                </TypographyStylesProvider>
            </Modal>
            <Modal opened={openedModalAddInfo}
                onClose={() => {
                    setOpenedModalAddInfo(false);
                }}
                size="100%"
                title="Thêm mới"
            >
                <form onSubmit={form.onSubmit((values) => {
                    console.log(values);
                    postRecruitDetail({ ...values });
                })}>
                    <Tabs defaultValue="viet">
                        <Tabs.List grow>
                            <Tabs.Tab value="viet" rightSection={
                                !isVietTabEmpty && <Text c="red"> *</Text>
                            }>Tiếng Việt</Tabs.Tab>
                            <Tabs.Tab value="english" rightSection={
                                !isEnglishTabEmpty && <Text c="red"> *</Text>
                            }>English</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="viet" pt="xs">
                            <TextInput
                                placeholder={labels.roleVn}
                                label={labels.roleVn}
                                withAsterisk
                                required
                                {...form.getInputProps('roleVn')}
                            />
                            <TextInput
                                placeholder={labels.addressVn}
                                label={labels.addressVn}
                                withAsterisk
                                required
                                {...form.getInputProps('addressVn')}
                            />
                            <Input.Wrapper
                                id="contentVn"
                                required
                                label={labels.contentVn}
                            >
                                <RichTextEditor
                                    id="contentVn"
                                    required
                                    controls={[
                                        ['bold', 'italic', 'underline'],
                                        ['h1', 'h2', 'h3', 'h4'],
                                        ['alignLeft', 'alignCenter', 'alignRight'],
                                        ['unorderedList', 'orderedList'],
                                        ['sup', 'sub'],
                                        ['link', 'clean'],
                                    ]}
                                    placeholder={labels.contentVn}
                                    label={labels.contentVn}
                                    {...form.getInputProps('contentVn')} />
                            </Input.Wrapper>
                        </Tabs.Panel>

                        <Tabs.Panel value="english" pt="xs">
                            <TextInput
                                placeholder={labels.roleEn}
                                label={labels.roleEn}
                                withAsterisk
                                required
                                {...form.getInputProps('roleEn')}
                            />
                            <TextInput
                                placeholder={labels.addressEn}
                                label={labels.addressEn}
                                withAsterisk
                                required
                                {...form.getInputProps('addressEn')}
                            />
                            <Input.Wrapper
                                id="contentEn"
                                required
                                label={labels.contentEn}
                            >
                                <RichTextEditor
                                    id="contentEn"
                                    required
                                    controls={[
                                        ['bold', 'italic', 'underline'],
                                        ['h1', 'h2', 'h3', 'h4'],
                                        ['alignLeft', 'alignCenter', 'alignRight'],
                                        ['unorderedList', 'orderedList'],
                                        ['sup', 'sub'],
                                        ['link', 'clean'],
                                    ]}
                                    placeholder={labels.contentEn}
                                    label={labels.contentEn}
                                    {...form.getInputProps('contentEn')} />
                            </Input.Wrapper>
                        </Tabs.Panel>
                    </Tabs>
                    <NumberInput
                        placeholder={labels.salary}
                        label={labels.salary}
                        required
                        hideControls
                        {...form.getInputProps('salary')}
                    />
                    <Divider mt="xs" />
                    <Group position="right" mt="xs">
                        <Button variant="default" onClick={() => {
                            setOpenedModalAddInfo(false);
                        }}>Huỷ bỏ</Button>
                        <Button type="submit">Thêm mới</Button>
                    </Group>
                </form>
            </Modal>
        </Paper >
    );
}

export default Recruit;
