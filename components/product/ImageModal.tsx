import {
	Box,
	Grid,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";

export const ImageModal = ({ img }: any) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box>
				<Image
					src={img[0] ?? null}
					onClick={onOpen}
					cursor={"pointer"}
					alt={"photo"}
					objectFit='cover'
				/>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} size={"full"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						<Grid
							templateColumns={[
								"repeat(1, 1fr)",
								"repeat(1, 1fr)",
								"repeat(2, 1fr)",
								"repeat(2, 1fr)",
								"repeat(2, 1fr)",
							]}
							gap={"15px"}>
							{img?.map((image: any, index: any) => (
								<Image key={index} w={"100%"} src={image} />
							))}
						</Grid>
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</>
	);
};
