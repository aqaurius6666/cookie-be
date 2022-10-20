dev-recreate:
	@ docker-compose --project-name cookie -f deploy/dev/docker-compose.yaml up -d 